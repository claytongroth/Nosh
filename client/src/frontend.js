// /client/App.js
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from "axios";
import Map from './Map';
import Example from './example.js';
import Query from './Query.js';
import Add from './Add.js';
import Delete from './Delete.js';
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
    this.DeleteComponent = () => {
      return (
        <Delete parentChange={(e)=>this.handleChange(e)} parentClick={(e)=>this.deleteFromDB(e)} />
      );
    };
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
    console.log("handleChange fired")
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
  // update page after or just modal?
  putDataToDB = () => {
    let url = "http://localhost:27017/api/putData"
    axios.post(url, {
      id: 123456789013,
      brands: "TESTPOST",
      manufacturing_places: "TESTPOST",
      product_name: "TESTPOST",
      last_editor: "TESTPOST"
    }).then(res => { res.data.errmsg ? console.log(res.data.errmsg): console.log("Post worked!")});
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = () => {
    let url = "http://localhost:27017/api/updateData";
    axios.post(url, {
      id: 123456789013,
      brands: "TESTupdatePOST",
      manufacturing_places: "TESTupdatePOST",
      product_name: "TESTupdatePOST",
      last_editor: "TESTupdatePOST"
    }).then(res => { res.data.errmsg ? console.log(res.data.errmsg): console.log("Update Post worked!")});
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = () => {
    console.log("deleting", this.state.gtin)
    let url = "http://localhost:27017/api/deleteData";
    const idToDelete = this.state.gtin
    axios.delete(url, {
      data: {
        id: idToDelete
      }
    }).then(res => { res.data.errmsg ? console.log(res.data.errmsg): console.log("Deleted: ", res)});
  };


  render() {
   return (
      <div>
      <Router>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <div className="container-fluid">
        <Link to={'/queryResults'}>Query Existing</Link>
        <Link to={'/addUpdate'}>Add/Update Data</Link>
        <Link to={'/delete'}>Delete Data</Link>
          <div className="row">
              <Switch>
                  <Route exact path='/queryResults' component={Query} />
                  <Route exact path='/addUpdate' component={Add} />
                  // the issue is  here with the arrow function
                  <Route exact path='/delete' component={this.DeleteComponent} />
              </Switch>
            <div className="col-md-8">
                <Map markerPosition={this.state.data[0] ? this.state.data[0].manufacturing_places: "places here"} test ={this.state.data} />
            </div>
          </div>
        </div>

      </Router>
      </div>
    );
  }
};

export default MainApp;
