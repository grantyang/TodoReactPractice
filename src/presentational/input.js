import React, { Component } from 'react';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }; // init state to blank
    //this.onInputChange = this.onInputChange.bind(this); // bind context to this
    //this.onInputSubmit = this.onInputSubmit.bind(this);
  }

  onInputChange = event => {
    // when input is changed, update state
    this.setState({ text: event.target.value });
  };

  onInputSubmit = event => {
    // when input is submitted, run fx
    
    event.preventDefault();
    this.props.fxToRun(this.state.text);
    this.setState({ text: '' }); //clears out input after submit
  };

  render() {
    return (
      <div className="row justify-content-sm-center">
        <div className="col-sm-7">
          <form className="input input-group" onSubmit={this.onInputSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter new todo here"
              value={this.state.text} // grab value from state
              onChange={this.onInputChange} // update state on change
            />
            <span className="input-group-btn">
              <button className="btn btn-success" type="submit">
                Create
              </button>
            </span>
          </form>
        </div>
      </div>
    );
  }
}
