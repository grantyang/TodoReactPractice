import React from 'react';
import { Link } from 'react-router-dom';

const TodoListView = ({ loading, listName, todoList, otherAuthoredLists, location }) => {
  //done: ({loading, completed, id}) destructuring
  if (loading) return <h1>Please wait, loading...</h1>;
//  <pre>{JSON.stringify({  location}, null, 4 )}</pre> debugging
  return (
    <div className="row justify-content-sm-center">
      <div className="col-sm-3 list-group">
        Lists Owned by You
        {otherAuthoredLists.map(list => {
          return (
            <Link
              key={list.name}
              className={`list-group-item`}
              to={`/list/${list.name}`}>
              {list.name}
            </Link>
          );
        })}
      </div>

      <div className="col-sm-6 list-group">
        List Items
        {todoList.map(todo => {
          return (
            <Link
              key={todo.id}
              className={`list-group-item completed${todo.completed}`}
              to={`/list/${listName}/todo/${todo.id}`}>
              {todo.text} {todo.dueDate && `Due: ${todo.dueDate}`}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TodoListView;