import React from 'react';
import { Link } from 'react-router-dom';


const TodoListItemEditView = props => {
  const todo = props.todo;
    return(
      <div>
        <div className="row justify-content-sm-center">
          <form className="col-sm-8" onSubmit={props.onEditSubmit}>
            <input
              className="todoItem list-group-item col-sm-12"
              type="text"
              value={props.initialTextInputValue}
              onChange={props.onEditChange} // update state on change
            />
          </form>
        </div>
        <div className="row justify-content-sm-center">
          <button
            className="col-sm-2 btn btn-item btn-success"
            onClick={props.onEditSubmit}>
            Save
          </button>

          <button
            className="col-sm-2 btn btn-item btn-danger"
            onClick={props.delete}>
            Delete
          </button>
        </div>
      </div>
    );
}
export default TodoListItemEditView;