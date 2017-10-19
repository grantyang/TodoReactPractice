import React from 'react';
import { Link } from 'react-router-dom';

const ListOfLists = props => {
  if (props.loading) return <h1>Please wait, loading...</h1>;
  return (
    <div className="row justify-content-sm-center">
      <span className="col-sm-8">Your Private Lists</span>
      <div className="col-sm-8 list-group">
        {props.listOfLists.map(list => {
          if (list.privacy === 'private') {
            return (
              <Link
                key={list.name}
                className={`list-group-item justify-content-between`}
                to={`/list/${list.name}`}>
                {list.name}{' '}
                <span className="badge badge-primary badge-pill">
                  {list.todoList.length}
                </span>
              </Link>
            );
          }
        })}
      </div>
      <span className="col-sm-8">Public Lists</span>
      <div className="col-sm-8 list-group">
        {props.listOfLists.map(list => {
          if (list.privacy === 'public') {
            return (
              <Link
                key={list.name}
                className={`list-group-item justify-content-between`}
                to={`/list/${list.name}`}>
                {list.name }{' '}
                <span className="badge badge-primary badge-pill">
                  {list.todoList.length}
                </span>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ListOfLists;
