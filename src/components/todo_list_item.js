import React, {Component} from 'react';

class TodoListItem extends Component{


    render(){
        return (
            <li className= {this.props.todo.completed} > 
                <span onClick= {() => this.props.toggleCompleted(this.props.todo)}>{this.props.todo.text}</span> 
                <button onClick= {() => this.props.delete(this.props.todo)}>
                Delete
                </button>
            </li>
        );
    }
}


export default TodoListItem;