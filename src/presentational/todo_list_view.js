import React from 'react';
import { Link } from 'react-router-dom';

const TodoListView = ({
  loading,
  listName,
  todos,
  otherAuthoredLists,
  location,
  refreshTodoListData
}) => {
  return (
    <div>
      <div className="row justify-content-center">
        <h3>{listName}</h3>
      </div>
      <div className="row justify-content-sm-center">
        <div className="col-md-3 list-group">
          Lists Owned by You
          {otherAuthoredLists.map(list => {
            return (
              <Link
                key={list.name}
                className={`list-group-item`}
                onClick={event => refreshTodoListData(event, list.name)}
                to={`/list/${list.name}`}>
                {list.name}
              </Link>
            );
          })}
        </div>
        <div className="col-md-6 list-group">
          List Items
          {todos.map(todo => {
            if (todo.todo_id)
              return (
                <Link
                  key={todo.todo_id}
                  className={`list-group-item `}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none'
                  }}
                  to={`/list/${listName}/todo/${todo.todo_id}`}>
                  {todo.text}{' '}
                  {todo.due_date &&
                    `Due: ${new Date(todo.due_date).toDateString()}`}
                </Link>
              );
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default TodoListView;
