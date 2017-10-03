import React from 'react';
import TodoListItem from './todo_list_item.js';
import { Link } from 'react-router-dom'; 

const TodoList = (props) => {
    if (props.loading) return (<h1>Please wait, loading...</h1>)
    else{
        const todoItems = props.todoList.map((todo) => {
            return (
                <Link key={todo.id} className= "btn btn-secondary list-group-item col-md-4 col-md-offset-4" to={`/todo/${todo.id}`}>{todo.text}</Link>
            );
        });
        return (
            <div> {todoItems} </div>
        );
    }
}


export default TodoList;