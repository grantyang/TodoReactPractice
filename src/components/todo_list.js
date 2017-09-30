import React from 'react';
import TodoListItem from './todo_list_item.js';

const TodoList = (props) => {
    if (props.loading) return (<h1>LOADING</h1>)
    else{
        const todoItems = props.todoList.map((todo) => {
            return (
                <TodoListItem
                    key= {todo.text}
                    todo= {todo}
                    toggleCompleted= {props.toggleCompleted}
                    delete= {props.delete}
                    editMode= {props.editMode}
                    save= {props.save}
                    />
            );
        });
    
        return (
            <ol > {todoItems} </ol>
        );
    }
}

export default TodoList;