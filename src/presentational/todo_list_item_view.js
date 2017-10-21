import React from 'react';
import { Link } from 'react-router-dom';
import GoogleMap from '../presentational/google_map.js';

const TodoListItemView = props => {
  const todo = props.todo;
  return (
    <div>
      <div className="row justify-content-sm-center">
        <span className={`col-sm-8 completed${todo.completed}`}>
          <span
            className="todoItem list-group-item"
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}>
            {todo.text}
          </span>
        </span>
      </div>
      <div className="row justify-content-sm-center">
        <Link
          className="col-sm-2 btn btn-item btn-warning"
          to={`/list/${props.getListName()}/todo/${todo.id}/edit`}>
          Edit
        </Link>

        <button
          className="col-sm-2 btn btn-item btn-info"
          onClick={() => props.toggleCompleted(todo)}>
          Toggle Completed
        </button>

        <button
          className="col-sm-2 btn btn-item  btn-danger"
          onClick={() => props.delete()}>
          Delete
        </button>
      </div>
      <div className="row justify-content-sm-center">
        <Link
          className="col-sm-4 btn btn-item btn-primary"
          to={`/list/${props.getListName()}`}>
          Return to List
        </Link>
      </div>
      <div className="row justify-content-sm-center">
        <GoogleMap
          saveLocation={props.saveLocation}
          location={props.location}
        />
      </div>
    </div>
  );
};
export default TodoListItemView;
