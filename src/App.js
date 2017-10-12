import React, { Component } from 'react';
import './App.css';
import NavBar from './components/nav_bar.js';
import Input from './components/input.js';
import ListOfLists from './presentational/list_of_lists.js';

class App extends Component {
  componentDidMount() {
    
    fetch('http://localhost:5000/lists/', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => {
        return res.json();
      })
      .then(returnedLists => {
        this.setState({
          listOfLists: returnedLists, // load in initial lists from server
          loading: false
        });
      });


      }
  

  constructor(props) {
    super(props);
    this.state = {
      listOfLists: [],
      loading: true,
      currentUser: {}
    };
  }

  create = newName => {
    if (!newName) {
      alert('Please input a value.');
      return;
    }

    if (this.state.listOfLists.find(item => item.name.toLowerCase() === newName.toLowerCase())) {
      //if there is a duplicate
      alert('Todo List already exists.');
      return;
    }

    const newList = {
      name: newName,
      creator: this.state.currentUser.userId,
      todoList: [],
      filter: 'ALL',
      searchTerm: '',
      loading: true
    };
    fetch('http://localhost:5000/create', {
      method: 'POST',
      body: JSON.stringify(newList),
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(newList => {
        this.setState({
          listOfLists: [newList, ...this.state.listOfLists] // add new Object to todoList
        });
      });
  };

  render() {    
    return (
      <div className="List">
        <NavBar />
        {!this.state.currentUser && <h1>Please log in to view this page.</h1>}
        {this.state.currentUser &&
        <div className="container">
          
          <Input fxToRun={this.create} />
          <ListOfLists
            className=""
            listOfLists={this.state.listOfLists}
            loading={this.state.loading}
          />
        </div>}
      </div>
    );
  }
}

export default App;
