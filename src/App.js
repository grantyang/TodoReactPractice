import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Input from './components/input.js';
import TodoList from './components/todo_list.js';
import Footer from './components/footer.js';
import SearchBar from './components/search_bar.js';
import { Link } from 'react-router-dom'; 

class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      todoList:[],
      filter: "ALL",
      searchTerm: '',
      loading: true
    };
  }

  componentDidMount(){
    fetch('http://localhost:5000/todos/',{ 
      method: 'GET'})
    .then(res => { return res.json()})
    .then( returnedList => {
      this.setState({
        todoList: returnedList, // load in initial list from server     
        loading: false   
      });
    })
  }
      // setTimeout(function(){
    //     res.json(updatedTodo) 

    // },1000)
  //componentDidMount
  //get request
  //runs once

  addToList = (todoText) => { //fat arrow function instead of binding separately
    console.log(this.state.todoList);
    if (!todoText) {
      alert('Please input a value');
    }
    else if (this.state.todoList.find(item => item.text===todoText)){ //if there is a duplicate
      alert('Todo item already exists');
    }
    else if (todoText){
      const todoObj = {
        text: todoText,
        completed: false,
        editMode: false,
        saving: false
      };
      fetch('http://localhost:5000/todos',{ 
        method: 'POST', 
        body: JSON.stringify(todoObj),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => { return res.json()})
      .then(newTodo => {
        this.setState({
          todoList:[newTodo, ...this.state.todoList] // add new Object to todoList
        });
      })
    }
  }

 

  clearAll = () => { 
    fetch(
        `http://localhost:5000/todos/`, 
        {method: 'DELETE'})
    .then(() => {
      this.setState({
        todoList: []
      });     
    })
    .catch(error => {
      return error;
    })
  }

  
  clearComplete = () => {
    fetch(
      `http://localhost:5000/todos?completed=true`, 
      {method: 'DELETE'})
    .then(() => {
      const newList = this.state.todoList.filter((item) => item.completed === false)
      this.setState({todoList:newList}); 
    })
    .catch(error => {
      return error;
    })
  }

  count = () => {
    let total = 0;
    this.state.todoList.forEach((element)=> {
      if (element.completed===false){
        total++;
      }
    });
    return total;
  }


  showAll = () => {
    this.setState({filter: "ALL"});
  }

  showCompleted = () => {
    this.setState({filter: "COMPLETED"});
  }

  showActive = () => {
    this.setState({filter: "ACTIVE"});
  }

  getVisibleTodos = () => { //return list of items based on filter
    console.log(this.state.todoList);
    console.log(this.state.filter);
    
    return this.state.todoList.filter( todo => {
      if (this.state.filter === "ALL") return todo;
      if (this.state.filter === "COMPLETED") return todo.completed;
      if (this.state.filter === "ACTIVE") return !todo.completed;
    });
  }

  setSearch = (searchTerm) => {
    this.setState({searchTerm:searchTerm}); //can be shortened?
  }

  search = () => {
    return this.getVisibleTodos().filter(todo => {
     if (this.state.searchTerm === '') return todo;
     else if (todo.text.includes(this.state.searchTerm)) return todo;
    });
  }

    //get visible todos, then filter further based on search term. return that in TodoList instead.
    //if searchTerm is part of any todo.text, show the todo.text, otherwise no show
    //reset searchTerm with button?
    
  

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Grant's TodoList</h2>
        </div>
        <div>
          <SearchBar setSearch= {this.setSearch} />
          <Input onTodoSubmit= {this.addToList} /*pass onToDoSubmit as prop*/ />
          <TodoList className= ""
                    todoList= {this.search()}
                    loading= {this.state.loading}
          />
          <Footer className= "list-group"
                  clear= {this.clearAll} 
                  clearComplete= {this.clearComplete}
                  showAll= {this.showAll}
                  showCompleted= {this.showCompleted}
                  showActive={this.showActive}
                  count= {this.count}
           />
           <Link className= "btn btn-primary col-md-2 col-md-offset-5" to="/about"> About Us </Link>
        </div>
      </div>
    );
  }
}

export default App;
