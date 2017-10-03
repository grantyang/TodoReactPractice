import React from 'react';
import TodoListItem from './todo_list_item.js';
import { Link } from 'react-router-dom'; 

const TodoList = (props) => {
    if (props.loading) return (<h1>LOADING</h1>)
    else{
        const todoItems = props.todoList.map((todo) => {
            return (
                <li key={todo.id}>
                <Link className= "btn btn-secondary" to={`/todo/${todo.id}`}>{todo.text}</Link>
                </li>
            );
        });
    
        return (
            <ol > {todoItems} </ol>
        );
    }
}


export default TodoList;