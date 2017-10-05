import React, { Component } from 'react';
import logo from './logo.svg';
import List from './components/list.js';
import { Link } from 'react-router-dom'; 
import './App.css';

import Input from './components/input.js';
import ListOfLists from './components/list_of_lists.js';

class App extends Component {
    componentDidMount(){
        fetch('http://localhost:5000/lists/',{ 
          method: 'GET'})
        .then(res => { return res.json()})
        .then( returnedLists => {
          this.setState({
            listOfLists: returnedLists, // load in initial lists from server     
            loading: false   
          });
        })
      }

    constructor(props){
      super(props);
      this.state = { 
        listOfLists:[],
        loading: true
      };
    }

    create = (newName) => {
        if (!newName) {
            alert('Please input a value.');
            return
        }

         if (this.state.listOfLists.find(item => item.name===newName)){ //if there is a duplicate
            alert('Todo List already exists.');
            return
        }

        const newList = {
            name: newName,
            todoList: [],
            filter: "ALL",
            searchTerm: '',
            loading: true
        };
        fetch('http://localhost:5000/create',{ 
            method: 'POST', 
            body: JSON.stringify(newList),
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        .then(res => { return res.json()})
        .then(newList => {
            this.setState({
            listOfLists:[newList, ...this.state.listOfLists] // add new Object to todoList
            });
        })

        } 

    render() {
        return (
            <div className="List">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2 className="Header-text">Grant's TodoLists</h2>
                </div>
                <div className='container'>
                    <Input fxToRun= {this.create} /*pass addToList as prop*/ />
                    <ListOfLists className= ""
                        listOfLists= {this.state.listOfLists}
                        loading= {this.state.loading}
                    />
                    <Link className= "btn btn-outline-info about-home col-sm-4 justify-content-sm-center" to="/about"> About Us </Link>
                </div>  
            </div>
        );
    }
}

export default App;