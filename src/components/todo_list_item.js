import React, {Component} from 'react';
import { Link } from 'react-router-dom'; 

class TodoListItem extends Component{
    componentDidMount(){
        const itemId= this.props.match.params.itemid;        
        fetch(`http://localhost:5000/todos/${itemId}`,{ 
          method: 'GET'})
        .then(res => { return res.json()})
        .then( returnedItem => {
            console.log('loaded.')
            console.log(returnedItem)
          this.setState({        
            todo: returnedItem, // load in initial list from server     
            text: returnedItem.text,    
            loading: false   
          });
        })
      }

    constructor(props){
        super(props);
        this.state = {text: '',
                      loading: true,
                      todo:{}
                    }; 
    }
    
    onEditChange = (event) => {  // when input is changed, update state
        console.log(event.target);
        this.setState({text: event.target.value});
    }

    onEditSubmit = (event) => {   // when input is submitted, add to App state
        event.preventDefault();
        this.save(this.state.todo, this.state.text);
    }

    editMode = (todo) => {
        this.setState({
          todo: {
              ...todo,
              editMode: true 
            }
        });
      }

  save = (todo, newText) => {
    this.setState({
      todo: {
          ...todo,
          saving: true
      }
    });

    fetch(`http://localhost:5000/todos/${todo.id}`,{ 
      method: 'PUT', 
      body: JSON.stringify({text: newText}),
      headers: {
        'Accept': 'application/json', // this is what i expect to recive from the server
        'Content-Type': 'application/json' // This is what i am sending to the server
      }
    })
    .then(res => { return res.json()})
    .then(() => {
      this.setState({
        todo: {
            ...todo,
            text: newText,
            editMode: false,
            saving: false
        }
      });
    })
  }
    


  toggleCompleted = (todo) => {
    
    fetch(`http://localhost:5000/todos/${todo.id}`,{ 
      method: 'PUT', 
      body: JSON.stringify({completed: !todo.completed}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => { return res.json()})
    .then(newTodo => {
      this.setState({
        todo: {
            ...todo,
            completed: !todo.completed 
          }
      });
    })    
  }

    delete = (todo) => {
        fetch(
            `http://localhost:5000/todos/${todo.id}`, 
            {method: 'DELETE'})
         .then(() => {
            window.history.back();
         })
        .catch(error => {
          return error;
        })
    }  

    render(){
        if (this.state.loading === true){
            return <li>loading...</li>
        }
        else if (this.state.todo.saving === true){
            return <li>saving...</li>
        }
        else if (this.state.todo.editMode === true){  //edit mode
            return (
                <div className='col-md-4 col-md-offset-4'>
                    <div className='todoItem'>
                        <form onSubmit= {this.onEditSubmit}>
                            <input 
                                className='list-group-item col-md-12'
                                type="text" 
                                value={this.state.text}
                                onChange= {this.onEditChange}  // update state on change
                            />

                            <button className= 'btn btn-item col-md-5 btn-success' type="submit" >
                                Save
                            </button>

                            <button className= 'btn btn-item col-md-5 col-md-offset-2 btn-danger' onClick= {() => this.delete(this.state.todo)}>
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            );
        }
        else {  //view mode
            return (
                <div className='col-md-4 col-md-offset-4'>
                    <div className='todoItem'>
                        <span className= {this.state.todo.completed} > 
                            <span className= 'list-group-item' onClick= {() => this.toggleCompleted(this.state.todo)}>{this.state.todo.text}</span> 
                            
                            <button className= 'col-md-5 btn btn-item btn-warning' onClick= {() => this.editMode(this.state.todo)}>
                                Edit
                            </button>

                            <button className= 'col-md-5 col-md-offset-2 btn btn-item  btn-danger' onClick= {() => this.delete(this.state.todo)}>
                                Delete
                            </button>
                        </span>
                    </div>
                    <div>
                    <Link className= "col-md-12 btn btn-item btn-primary" to="/"> Return Home </Link>
                    </div>
                </div>

            );
        }
    }
}


export default TodoListItem;