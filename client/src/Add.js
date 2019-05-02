import React from "react";

const Add = () => {
  return (
    <div className="col-md-4">
      <h3 className="text-center">
        Add a Product
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
      <button onClick = {()=>this.putDataToDB()}>Add data</button>
      <button onClick = {()=>this.updateDB()}>Update data</button>
    </div>
  );
}

export default Add;
