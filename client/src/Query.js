import React from "react";

class Query extends React.Component {
  constructor(props) {
    super(props);
    };
  click = (e) => {
    e.preventDefault();
    this.props.parentClick(e);
  }
  change = (e) => {
    this.props.parentChange(e);
  }
  componentDidMount(){
    console.log("rendered Query")
  }
  render(){
    return (
    <div className="col-md-4">
      <h3 className="text-center">
        View a Product
      </h3>
      <form className="form-horizontal">
        <fieldset>
          {/* Text input*/}
          <div className="form-group">
            <label className="col-md-12 control-label" htmlFor="Universal Product Code">Universal Product Code</label>
            <div className="col-md-12">
              <input onChange={(e)=>this.change(e)} className="form-control input-md" id="Universal Product Code" name="Universal Product Code" placeholder="(GTIN-12)" type="text" />
            </div>
          </div>{/* Search input*/}
          <div className="form-group">
            <label className="col-md-12 control-label" htmlFor="Submit" />
            <div className="col-md-12">
              <button className="btn btn-primary" id="Submit" name="Submit" onClick={(e)=>this.click(e)}>Submit</button> <button className="btn btn-warning" id="Clear" name="Clear">Clear</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
}

export default Query;
