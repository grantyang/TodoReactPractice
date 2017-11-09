import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'whatwg-fetch';
import 'react-rte';


import App from './App.js';
import TodoList from './containers/todo_list.js';
import About from './presentational/about.js';
import TodoListItem from './containers/todo_list_item.js';
import TodoListEdit from './containers/todo_list_edit.js'
import TodoListItemEdit from './containers/todo_list_item_edit.js';
import SignUp from './containers/signup.js';
import Login from './containers/login.js';
import Profile from './presentational/profile.js';
import ProfileEdit from './containers/profile_edit.js';
import ChangePassword from './containers/change_password.js';
import PrivateRoute from './containers/private_route.js';
import store from './redux_create_store.js';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div  /*if user is on path, show component  <App /> */>
                <Switch /*Takes in Routes and will render only the first match*/>
                    <Route exact path="/" component={App} />
                    <PrivateRoute path="/list/:listName/todo/:itemId/edit" component={TodoListItemEdit} />
                    <PrivateRoute path="/list/:listName/todo/:itemId" component={TodoListItem} />
                    <PrivateRoute path="/list/:listName/edit" component={TodoListEdit} />
                    <PrivateRoute path="/list/:listName" component={TodoList} />
                    <PrivateRoute path="/profile/changepassword" component={ChangePassword} />     
                    <PrivateRoute path="/profile/edit" component={ProfileEdit} />     
                    <PrivateRoute path="/profile/" component={Profile} />     
                    <Route exact path="/signup" component={SignUp} />     
                    <Route exact path="/login" component={Login} />       
                    <Route exact path="/about" component={About} />      
                </Switch>   
            </div>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root'));
registerServiceWorker();


