import React from 'react';
import TodoListItem from './todo_list_item.js';

const TodoList = (props) => {
    const todoItems = props.todoList.map((todo) => {
        return (
            <TodoListItem
                key= {todo.text}
                todo= {todo}
                toggleCompleted= {props.toggleCompleted}
                delete= {props.delete}
                edit= {props.edit}
                />
        );
    });

    return (
        <ol> {todoItems} </ol>
    );
}

export default TodoList;