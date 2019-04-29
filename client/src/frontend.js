// /client/App.js
import React, { Component } from "react";
import axios from "axios";
import Map from './Map';
import './bootstrap.css';
import './style.css'


class MainApp extends React.Component {
  constructor(props, context) {
  super(props, context);
    this.state = {
      gtin: null,
      mlocation: null,
      ingredients: [],
      labels: [],
      data: [],
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    let mongoQuery = "?id=" + this.state.gtin.toString();
    // create the mongo query in the logic here
    // 0016229004019
    this.getDataFromDb(mongoQuery);
    console.log("submited: ", mongoQuery)
  }
  handleChange(e){
    let field = e.target.name;
    let value = e.target.value;
    console.log(field);
    if (field === "Universal Product Code"){this.setState({gtin: value}, console.log("State for ", field, " uppdated to: ", this.state.gtin));};
    if (field === "Manufacturing Location"){this.setState({mlocation: value}, console.log("State for ", field, " uppdated to: ", this.state.mlocation))}
    if (field === "Ingredients"){this.setState({ingredients: value}, console.log("State for ", field, " uppdated to: ", this.state.ingredients))}
    if (field === "Labels"){this.setState({labels: value}, console.log("State for ", field, " uppdated to: ", this.state.labels))}
  }
  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    //this.getDataFromDb();
    if (!this.state.intervalIsSet) {
    //  let interval = setInterval(this.getDataFromDb, 1000000);
      //this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = (query) => {
    let url = "http://localhost:27017/api/getData" + query
    console.log("getDataFromDb Fired with URL: ", url)
    fetch(url) //  Query format here: fetch("http://localhost:27017/api/getData" + "?id=234234324342&brands=Taste%20Adventure")"?id=0000000035590&brands=Taste%20Adventure"
    //.then(data => data.text()).then(data => console.log(data))
    .then(data => data.json())
    .then(answer => this.setState({ data: answer }, console.log(this.state.data)));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    axios.post("http://localhost:27017/api/putData", {
      id: idToBeAdded,
      message: message
    });
  };
  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });
    axios.delete("http://localhost:27017/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };
  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("http://localhost:27017/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };

  render() {
   return (
      <div>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <div className="container-fluid">
          {this.state.data[0] ? this.state.data[0].manufacturing_places: "places here"}
          <div className="row">
            <div className="col-md-4">
              <h3 className="text-center">
                Nosh
              </h3>
              <form className="form-horizontal">
                <fieldset>
                  {/* Text input*/}
                  <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="Universal Product Code">Universal Product Code</label>
                    <div className="col-md-12">
                      <input onChange={(e)=>this.handleChange(e)} className="form-control input-md" id="Universal Product Code" name="Universal Product Code" placeholder="(GTIN-12)" type="text" />
                    </div>
                  </div>{/* Search input*/}
                  <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="Manufacturing Location">Manufacturing Location</label>
                    <div className="col-md-12">
                      <input onChange={(e)=>this.handleChange(e)} className="form-control input-md" id="Manufacturing Location" name="Manufacturing Location" placeholder="Address" type="search" />
                    </div>
                  </div>{/* Select Multiple */}
                  <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="Ingredients">Ingredients</label>
                    <div className="col-md-12">
                      <select onChange={(e)=>this.handleChange(e)} className="form-control" id="Ingredients" multiple="multiple" name="Ingredients">
                        <option value="soy">
                          Soy
                        </option>
                        <option value="wheat">
                          Wheat
                        </option>
                        <option value="etc.">
                          etc.
                        </option>
                      </select>
                    </div>
                  </div>{/* Multiple Checkboxes */}
                  <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="Labels">Labels</label>
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label onChange={(e)=>this.handleChange(e)} htmlFor="Labels-0"><input id="Labels-0" name="Labels" type="checkbox" defaultValue="organic" /> Certified Organic</label>
                      </div>
                      <div className="checkbox">
                        <label onChange={(e)=>this.handleChange(e)} htmlFor="Labels-1"><input id="Labels-1" name="Labels" type="checkbox" defaultValue="etc" /> etc.</label>
                      </div>
                      <div className="checkbox">
                        <label  onChange={(e)=>this.handleChange(e)} htmlFor="Labels-2"><input id="Labels-2" name="Labels" type="checkbox" defaultValue="etc" /> etc.</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="Submit" />
                    <div className="col-md-12">
                      <button className="btn btn-primary" id="Submit" name="Submit" onClick={(e)=>this.handleSubmit(e)}>Submit</button> <button className="btn btn-warning" id="Clear" name="Clear">Clear</button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="col-md-8">
                <Map markerPosition={this.state.data[0] ? this.state.data[0].manufacturing_places: "places here"} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MainApp;
