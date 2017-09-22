import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Input from './components/input.js';
import TodoList from './components/todo_list.js';
import Footer from './components/footer.js';

class App extends Component {
  constructor(props){
    super(props);

    this.state = { 
      todoList:[],
      filter: "ALL" 
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
          completed: !item.completed //TODO change to T/F and toggle with !
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
    console.log(todo.text)
    const newList = this.state.todoList.filter((item) => item.text !== todo.text)
    console.log(newList)
    this.setState({todoList:[]});
    console.log(this.state.todoList)
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
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>TodoList</h2>
        </div>
        <p className="App-intro">
          To add items to the list, input below.
        </p>
        <div>
          <Input onTodoSubmit= {this.addToList} /*pass onToDoSubmit as prop*/ />
          <TodoList todoList= {this.getVisibleTodos()}
                    toggleCompleted= {this.toggleCompleted} 
                    delete= {this.delete}
                    />
          <Footer 
          clear= {this.clearAll} 
          clearComplete= {this.clearComplete}
          showAll= {this.showAll}
          showCompleted= {this.showCompleted}
          showActive={this.showActive}
          count= {this.count}
           />
        </div>
      </div>
      
    );
  }
}

export default App;
