import React, {Component} from 'react';

class TodoListItem extends Component{
 
    constructor(props){
        super(props);
        this.state = {text: this.props.todo.text};  // init state to blank
    }


    onEditChange = (event) => {  // when input is changed, update state
        this.setState({text: event.target.value});
    }

    onEditSubmit = (event) => {   // when input is submitted, add to App state
        event.preventDefault();
        this.props.save(this.props.todo, this.state.text);
    }




    render(){
        if (this.props.todo.saving === true){
            return <li>saving...</li>
        }
        else if (this.props.todo.editMode === true){  //edit mode
            return (
                <li>
                    <form onSubmit= {this.onEditSubmit}>
                        <input 
                            type="text" 
                            value={this.state.text}
                            onChange= {this.onEditChange}  // update state on change
                        />

                        <button type="submit" >
                            Save
                        </button>

                        <button onClick= {() => this.props.delete(this.props.todo)}>
                            Delete
                        </button>
                    </form>
                </li>
            );
        }
        else {  //view mode
            return (
                <li className= {this.props.todo.completed} > 
                    <span onClick= {() => this.props.toggleCompleted(this.props.todo)}>{this.props.todo.text}</span> 
                    
                    <button onClick= {() => this.props.editMode(this.props.todo)}>
                        Edit
                    </button>

                    <button onClick= {() => this.props.delete(this.props.todo)}>
                        Delete
                    </button>

                </li>
            );
        }
    }
}


export default TodoListItem;