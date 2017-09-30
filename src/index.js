import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'whatwg-fetch'

import App from './App';
import About from './components/about.js';

/* fetch('http://localhost:5000/todos').then(response => { // make a request to server, not always GET but is default
   return response.json()
  }).then(todos => {
      //console.log(todos)
})

fetch('http://localhost:5000/todos', { // make a request to server with a method of POST
    method: "POST",
    body: {
        text: 'wowoow'
    }
}).then(response => { return response.json() }).then(newTodo => {
     console.log(newTodo) // {text: "whatever we sent", id: "kn43k3n24lk3nlk23n2"}
 })


{
     deleteTodo: () => {
        fetch(`http://localhost:5000/todos/${this.props.id}`, {method: 'DELETE'}).then(response => { // make a request to server, not always GET but is default
         return response.json()
        }).then(todos => {
            //console.log(todos)
        })
     }
 } */

 
ReactDOM.render(
    <BrowserRouter>
        <div  /*if user is on path, show component  <App /> */>
            <Switch /*Takes in Routes and will render only the first match*/>
                <Route path="/about" component={About} />
                <Route path="/" component={App} />
            </Switch>   
        </div>
    </BrowserRouter>
    ,
    document.getElementById('root'));
registerServiceWorker();


