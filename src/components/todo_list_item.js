import React, {Component} from 'react';
import { Link } from 'react-router-dom'; 

class TodoListItem extends Component{
    componentDidMount(){
        const itemId= this.props.match.params.itemId;        
        fetch(`http://localhost:5000/list/${this.getListName()}/${itemId}`,{ 
          method: 'GET'})
        .then(res => { return res.json()})
        .then( returnedItem => {
          this.setState({        
            todo: returnedItem, // load in initial list from server     
            text: returnedItem.text,    //GY initialTextInputValue
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
    
    getListName = () => {
        return this.props.match.params.listName;   
    }
    onEditChange = (event) => {  // when input is changed, update state
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
    fetch(`http://localhost:5000/list/${this.getListName()}/${todo.id}`,{
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
    fetch(`http://localhost:5000/list/${this.getListName()}/${todo.id}`,{
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
        console.log(this.getListName())
        fetch(
            `http://localhost:5000/list/${this.getListName()}/${todo.id}`,
            {method: 'DELETE'})
         .then(() => {
            window.history.back();//GY react router navigation withRouter history.push state /programatically navigate
         })
        .catch(error => {
          return error;
        })
    }  

    render(){
        if (this.state.loading === true){
            return <b>Please wait, loading...</b>
        }
        else if (this.state.todo.saving === true){
            return <b>Please wait, saving...</b>
        }
        else if (this.state.todo.editMode === true){  //edit mode //GY two different components
            return (
                <div>
                    <div className='row justify-content-sm-center'>
                        <form className='col-sm-8' onSubmit= {this.onEditSubmit}>
                            <input 
                                className='todoItem list-group-item col-sm-12'
                                type="text" 
                                value={this.state.text}
                                onChange= {this.onEditChange}  // update state on change
                            />
                        </form>
                    </div>
                    <div className='row justify-content-sm-center'>
                        <button className= 'col-sm-2 btn btn-item btn-success' onClick= {this.onEditSubmit}>
                            Save
                        </button>

                        <button className= 'col-sm-2 btn btn-item btn-danger' onClick= {() => this.delete(this.state.todo)}>
                            Delete
                        </button>
                    </div>
                </div>
            );
        }
        else {  //view mode
            const todo = this.state.todo;
            const listName= this.props.match.params.listName;   
            return (
                <div>
                    <div className='row justify-content-sm-center'>
                        <span className= {`col-sm-8 completed${todo.completed}`}> 
                            <span className= 'todoItem list-group-item'>{todo.text}</span> 
                        </span>
                    </div>
                    <div className='row justify-content-sm-center'>
                        <button className= 'col-sm-2 btn btn-item btn-warning' 
                            onClick= {() => this.editMode(todo)}>
                            Edit
                        </button>

                        <button className= 'col-sm-2 btn btn-item btn-info' 
                            onClick= {() => this.toggleCompleted(todo)}>
                            Toggle Completed
                        </button>

                        <button className= 'col-sm-2 btn btn-item  btn-danger' 
                            onClick= {() => this.delete(todo)}>
                            Delete
                        </button>
                    </div>
                    <div className='row justify-content-sm-center'>
                        <Link className= "col-md-4 btn btn-item btn-primary" to={`/list/${this.getListName()}`}> Return to List </Link>
                    </div>
                </div>
            );
        }
    }
}


export default TodoListItem;