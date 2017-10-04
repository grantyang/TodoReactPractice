import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'whatwg-fetch'

import App from './App.js';
import List from './components/list.js';
import About from './components/about.js';
import TodoListItem from './components/todo_list_item.js';
import EditList from './components/edit_list.js'


// / is a list of todo lists, each link has the name of the todo list and how many todos it has in it
// /lists/create A page with a form to create todo lists
// /lists/:id/edit A page where you can edit the name of the todo list, you can also delete the todo list here
// /lists/:id A page with a list of todos, each link has the text of the todo and if it is completed or not

ReactDOM.render(
    <BrowserRouter>
        <div  /*if user is on path, show component  <App /> */>
            <Switch /*Takes in Routes and will render only the first match*/>
                <Route exact path="/" component={App} />
                <Route path="/list/edit/:listName/" component={EditList} />
                <Route path="/list/:listName/:itemId" component={TodoListItem} />
                <Route path="/list/:listName" component={List} />
                <Route exact path="/about" component={About} />      
            </Switch>   
        </div>
    </BrowserRouter>
    ,
    document.getElementById('root'));
registerServiceWorker();


