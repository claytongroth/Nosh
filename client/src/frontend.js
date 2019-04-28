// /client/App.js
import React, { Component } from "react";
import axios from "axios";
import Map from './Map';
import './bootstrap.css';
import './style.css'


class App extends React.Component {
  render() {
   return (
      <div>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <h3 className="text-center">
                Open Food Facts Data Query
              </h3>
              <form className="form-horizontal">
                <fieldset>
                  {/* Text input*/}
                  <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="Universal Product Code">Universal Product Code</label>
                    <div className="col-md-12">
                      <input className="form-control input-md" id="Universal Product Code" name="Universal Product Code" placeholder="(GTIN-12)" type="text" />
                    </div>
                  </div>{/* Search input*/}
                  <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="Manufacturing Location">Manufacturing Location</label>
                    <div className="col-md-12">
                      <input className="form-control input-md" id="Manufacturing Location" name="Manufacturing Location" placeholder="Address" type="search" />
                    </div>
                  </div>{/* Select Multiple */}
                  <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="Ingredients">Ingredients</label>
                    <div className="col-md-12">
                      <select className="form-control" id="Ingredients" multiple="multiple" name="Ingredients">
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
                        <label htmlFor="Labels-0"><input id="Labels-0" name="Labels" type="checkbox" defaultValue="organic" /> Certified Organic</label>
                      </div>
                      <div className="checkbox">
                        <label htmlFor="Labels-1"><input id="Labels-1" name="Labels" type="checkbox" defaultValue="etc" /> etc.</label>
                      </div>
                      <div className="checkbox">
                        <label htmlFor="Labels-2"><input id="Labels-2" name="Labels" type="checkbox" defaultValue="etc" /> etc.</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="Submit" />
                    <div className="col-md-12">
                      <button className="btn btn-primary" id="Submit" name="Submit">Submit</button> <button className="btn btn-warning" id="Clear" name="Clear">Clear</button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="col-md-8">
                <Map/>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
