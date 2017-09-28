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
      searchTerm: ''
    };

  }

  addToList = (todoItem) => { //fat arrow function instead of binding separately
    console.log(this.state.todoList);
    if (!todoItem) {
      alert('Please input a value');
    }
    
    else if (this.state.todoList.find(item => item.text===todoItem)){ //if there is a duplicate
      alert('Todo item already exists');
    }

    else if (todoItem){
      const todoObj = {
        text: todoItem,
        completed: false,
        editMode: false
      };
      this.setState({
        todoList:[todoObj, ...this.state.todoList] // add todoItem to todoList
      });
    }
  }

  toggleCompleted = (todo) => {
    this.setState({
      todoList: this.state.todoList.map(item => {
        if (item.text !== todo.text){ //if an item does not match text
          // then return it to the new array without touching it

          return item;
        }
        // otherwise, return the item with a value changed.
        // EQUIV shortand: return Object.extend({}, todo, { completed: true})
        else return {
          ...todo,
          completed: !item.completed 
        };
      })
    })
  }

  clearAll = () => {
    this.setState({
      todoList: []
    });        
  }

  
  clearComplete = () => {
    const newList = this.state.todoList.filter((item) => item.completed === false)
    this.setState({todoList:newList});
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

  delete = (todo) => {
    const newList = this.state.todoList.filter((item) => item.text !== todo.text)
    this.setState({todoList:newList});
  }

  editMode = (todo) => {
    //when clicked, change field to input. onSubmit, create new array with todo.text of this todo updated.
    this.setState({
      todoList: this.state.todoList.map(item => {
        if (item.text !== todo.text){ 
          return item;
        }
        else return {
          ...todo,
          editMode: true 
        };
      })
    });
  }

  save = (todo, newText) => {
    this.setState({
      todoList: this.state.todoList.map(item => {
        if (item.text !== todo.text){ 
          return item;
        }
        else return {
          ...todo,
          text: newText,
          editMode: false 
        };
      })
    });
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
    })
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
        <p className="App-intro">
          To add items to the list, input below.
        </p>
        <div>
          <SearchBar setSearch= {this.setSearch} />
          <Input onTodoSubmit= {this.addToList} /*pass onToDoSubmit as prop*/ />
          <TodoList todoList= {this.search()}
                    toggleCompleted= {this.toggleCompleted} 
                    delete= {this.delete}
                    editMode= {this.editMode}
                    save= {this.save}
          />
          <Footer clear= {this.clearAll} 
                  clearComplete= {this.clearComplete}
                  showAll= {this.showAll}
                  showCompleted= {this.showCompleted}
                  showActive={this.showActive}
                  count= {this.count}
           />
           <Link className= "btn btn-primary" to="/about"> About Us </Link>
        </div>
      </div>
      
    );
  }
}

export default App;
