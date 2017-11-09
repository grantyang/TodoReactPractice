import React from 'react';
import { Link } from 'react-router-dom';

const ListOfLists = props => {
  if (props.loading) return <h1>Please wait, loading...</h1>;
  return (
    <div className="row justify-content-sm-center">
      <span className="col-sm-8">Your Private Lists</span>
      <div className="col-md-8 list-group">
        {props.listOfLists.map(list => {
          if (
            list.privacy === 'private' &&
            list.creator === props.currentUserId
          ) {
            return (
              <Link
                key={list.list_id}
                className={`list-group-item justify-content-between`}
                to={`/list/${list.name}`}>
                {list.name}{' '}
                <span className="badge badge-primary badge-pill">
                  {list.count} 
                </span>
              </Link>
            );
          }
          return null;
        })}
      </div>
      <span className="col-sm-8">Shared Lists</span>
      <div className="col-md-8 list-group">
        {props.listOfLists.map(list => {
          if (
            list.privacy === 'private' &&
            list.creator !== props.currentUserId
          ) {
            return (
              <Link
                key={list.list_id}
                className={`list-group-item justify-content-between`}
                to={`/list/${list.name}`}>
                {list.name}{' '}
                <span className="badge badge-primary badge-pill">
                  {list.count}
                </span>
              </Link>
            );
          }
          return null;
          
        })}
      </div>
      <span className="col-sm-8">Public Lists</span>
      <div className="col-md-8 list-group">
        {props.listOfLists.filter(l => l.privacy === 'public').map(list => {
          console.log(list)
          if (list.privacy === 'public') {
            console.log('hmm')
            
            return (
              <Link
                key={list.list_id}
                className={`list-group-item justify-content-between`}
                to={`/list/${list.name}`}>
                {list.name}{' '}
                <span className="badge badge-primary badge-pill">
                  {list.count}
                </span>
              </Link>
            );
          }
          return null;
          
        })}
      </div>
    </div>
  );
};

export default ListOfLists;
