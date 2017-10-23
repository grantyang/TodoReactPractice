import React from 'react';
import { Link } from 'react-router-dom';

const TodoListEditView = props => {
  return (
    <div className="List">
      <div>
        <div className="row justify-content-sm-center">
          <form className="col-sm-8" onSubmit={props.onSave}>
            <input
              className="todoItem list-group-item col-sm-12"
              type="text"
              value={props.textInputValue}
              onChange={props.onTextChange} // update state on change
            />
          </form>
        </div>
        <div className="row justify-content-sm-center mt-2">
          <span className="btn">Privacy Setting:</span>
          <select
            className="form-control col-sm-2"
            onChange={props.onPrivacyChange}
            value={props.privacyInput}>
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>
        <button
          className="col-sm-2 btn btn-item btn-success"
          onClick={props.onSave}>
          Save
        </button>
        <button
          className="btn btn-item col-md-2 col-md-offset-5 btn-danger"
          onClick={() => props.delete()}>
          Delete
        </button>
        <div className="row justify-content-sm-center">
          <Link
            className="col-md-2 col-md-offset-5 btn btn-item btn-primary"
            to={`/list/${props.listName}`}>
            Return to List
          </Link>
        </div>
      </div>
    </div>
  );
};
export default TodoListEditView;
