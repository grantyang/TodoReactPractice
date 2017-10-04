import React from 'react';
import { Link } from 'react-router-dom'; 

const ListOfLists = (props) => {
    if (props.loading) return (<h1>Please wait, loading...</h1>)
    
    const lists = props.listOfLists.map((list) => {
        return (
            <Link key={list.name} className= {`btn btn-secondary list-group-item col-md-4 col-md-offset-4`} 
                to={`/list/${list.name}`}>{list.name} -- Total items: {list.todoList.length}</Link>
        );
    });
    return (
        <div> {lists} </div>
    );
}

export default ListOfLists;