import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'whatwg-fetch'

import App from './App.js';
import List from './components/list.js';
import About from './presentational/about.js';
import TodoListItem from './components/todo_list_item.js';
import EditList from './components/edit_list.js'
import TodoListItemEdit from './components/todo_list_item_edit.js';
import SignUp from './components/signup.js'
import Login from './components/login.js'
import Profile from './components/profile.js'
import ProfileEdit from './components/profile_edit.js'

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
                <Route path="/list/:listName/todo/:itemId/edit" component={TodoListItemEdit} />
                <Route path="/list/:listName/todo/:itemId" component={TodoListItem} />
                <Route path="/list/:listName" component={List} />
                <Route exact path="/profile/" component={Profile} />     
                <Route exact path="/profile/edit" component={ProfileEdit} />     
                <Route exact path="/signup" component={SignUp} />     
                <Route exact path="/login" component={Login} />       
                <Route exact path="/about" component={About} />      
            </Switch>   
        </div>
    </BrowserRouter>
    ,
    document.getElementById('root'));
registerServiceWorker();


