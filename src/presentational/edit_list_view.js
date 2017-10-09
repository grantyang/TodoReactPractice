import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

import Input from '../components/input.js';

const EditListView = props => {
  return (
    <div className="List">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 className="Header-text">Editing: {props.getListName()}</h2>
      </div>
      <div>
        <b>Change Name to:</b> <Input fxToRun={props.changeName} />
        <button
          className="btn btn-item col-md-2 col-md-offset-5 btn-danger"
          onClick={() => props.delete()}>
          Delete
        </button>
        <Link
          className="col-md-2 col-md-offset-5 btn btn-item btn-primary"
          to={`/list/${props.getListName()}`}>
          Return to List
        </Link>
      </div>
    </div>
  );
};
export default EditListView;
