import React from 'react';
import { Link } from 'react-router-dom';
import GoogleMap from '../presentational/google_map.js';
import RichTextEditor from 'react-rte';

const TodoListItemView = props => {
  const todo = props.todo;
  if (props.loading === true) return <b>Please wait, loading...</b>;
  return (
    <div>
      <div className="row justify-content-sm-center">
        <span
          className="todoItem list-group-item col-sm-6"
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none'
          }}>
          {todo.text}
        </span>
      </div>
      <div className="row justify-content-sm-center mt-2">
        <span className="">Comment:</span>
      </div>
      <div className="row justify-content-sm-center">
        <RichTextEditor
          className="col-md-8"
          value={props.richTextValue}
          readOnly={true}
        />
      </div>

      <div className="row justify-content-sm-center">
        <Link
          className="col-md-2 btn btn-item btn-warning"
          to={`/list/${props.listName}/todo/${todo.todoId}/edit`}>
          Edit
        </Link>

        <button
          className="col-md-2 btn btn-item btn-info"
          onClick={() => props.toggleCompleted(todo)}>
          Toggle Completed
        </button>

        <button
          className="col-md-2 btn btn-item  btn-danger"
          onClick={() => props.delete()}>
          Delete
        </button>
      </div>
      <div className="row justify-content-sm-center">
        <Link
          className="col-md-4 btn btn-item btn-primary"
          to={`/list/${props.listName}`}>
          Return to List
        </Link>
      </div>
      <div className="row justify-content-sm-center">
        <GoogleMap
          saveLocation={props.saveLocation}
          location={props.location}
        />
      </div>

      <div className="justify-content-center row mt-2 ">
        {todo.photo_links.length > 0 &&
          todo.photo_links.map(link => {
            return (
              <img
                key={link}
                src={link}
                alt="Attached"
                className="profile-picture img-thumbnail"
              />
            );
          })}
      </div>
    </div>
  );
};
export default TodoListItemView;
