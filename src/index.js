import React from 'react';
import ReactDOM from 'react-dom';


import {BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'whatwg-fetch';

import App from './App.js';
import TodoList from './components/todo_list.js';
import About from './presentational/about.js';
import TodoListItem from './components/todo_list_item.js';
import TodoListEdit from './components/todo_list_edit.js'
import TodoListItemEdit from './components/todo_list_item_edit.js';
import SignUp from './components/signup.js';
import Login from './components/login.js';
import Profile from './components/profile.js';
import ProfileEdit from './components/profile_edit.js';
import ChangePassword from './components/change_password.js';
import PrivateRoute from './components/private_route.js';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducers/index.js';

// The Store is the object that brings them together. The store has the following responsibilities:
// Holds application state;
// Allows access to state via getState();
// Allows state to be updated via dispatch(action);
// Registers listeners via subscribe(listener);
// Handles unregistering of listeners via the function returned by subscribe(listener).

let store = createStore(allReducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
console.log(store.getState())

// You may optionally specify the initial state as the second argument to createStore(). 
// This is useful for hydrating the state of the client to match the state of a Redux application running on the server.

ReactDOM.render(
   // <Provider store={store}>
        <BrowserRouter>
            <div  /*if user is on path, show component  <App /> */>
                <Switch /*Takes in Routes and will render only the first match*/>
                    <Route exact path="/" component={App} />
                    <PrivateRoute path="/list/:listName/todo/:itemId/edit" component={TodoListItemEdit} />
                    <PrivateRoute path="/list/:listName/todo/:itemId" component={TodoListItem} />
                    <PrivateRoute path="/list/:listName/edit" component={TodoListEdit} store={store} />
                    <PrivateRoute path="/list/:listName" component={TodoList} store={store} />
                    <PrivateRoute path="/profile/changepassword" component={ChangePassword} />     
                    <PrivateRoute path="/profile/edit" component={ProfileEdit} />     
                    <PrivateRoute path="/profile/" component={Profile} />     
                    <Route exact path="/signup" component={SignUp} />     
                    <Route exact path="/login" component={Login} />       
                    <Route exact path="/about" component={About} />      
                </Switch>   
            </div>
        </BrowserRouter>
    //</Provider>
    ,
    document.getElementById('root'));
registerServiceWorker();


