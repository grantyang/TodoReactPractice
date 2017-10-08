import React from 'react';
import { Link } from 'react-router-dom';


const TodoListItemView = props => {
  const todo = props.todo;
    return(
      <div>
      <div className="row justify-content-sm-center">
        <span className={`col-sm-8 completed${todo.completed}`}>
          <span className="todoItem list-group-item">{todo.text}</span>
        </span>
      </div>
      <div className="row justify-content-sm-center">
        <button
          className="col-sm-2 btn btn-item btn-warning"
          onClick={() => props.editMode(todo)}>
          Edit
        </button>

        <button
          className="col-sm-2 btn btn-item btn-info"
          onClick={() => props.toggleCompleted(todo)}>
          Toggle Completed
        </button>

        <button
          className="col-sm-2 btn btn-item  btn-danger"
          onClick={() => props.delete(todo)}>
          Delete
        </button>
      </div>
      <div className="row justify-content-sm-center">
        <Link
          className="col-md-4 btn btn-item btn-primary"
          to={`/list/${props.getListName()}`}>
          {' '}
          Return to List{' '}
        </Link>
      </div>
      </div>
    );
}
export default TodoListItemView;
