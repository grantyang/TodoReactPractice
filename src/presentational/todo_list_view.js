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
  //done: ({loading, completed, id}) destructuring
  if (loading) return <h1>Please wait, loading...</h1>;
  //  <pre>{JSON.stringify({  location}, null, 4 )}</pre> debugging
  return (
    <div>
      <div className="row justify-content-sm-center">
        <h3>{listName}</h3>
      </div>
      <div className="row justify-content-sm-center">
        <div className="col-sm-3 list-group">
          Lists Owned by You
          {otherAuthoredLists.map(list => {
            return (
              <Link
                key={list.name}
                className={`list-group-item`}
                onClick={(event) => refreshTodoListData(event, list.name)}
                to={`/list/${list.name}`}>
                {list.name}
              </Link>
            );
          })}
        </div>
        <div className="col-sm-6 list-group">
          List Items
          {todos.map(todo => {
            return (
              <Link
                key={todo.id}
                className={`list-group-item `}
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none'
                }}
                to={`/list/${listName}/todo/${todo.id}`}>
                {todo.text} {todo.dueDate && `Due: ${todo.dueDate}`}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TodoListView;
