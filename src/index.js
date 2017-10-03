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
import TodoListItem from './components/todo_list_item';

ReactDOM.render(
    <BrowserRouter>
        <div  /*if user is on path, show component  <App /> */>
            <Switch /*Takes in Routes and will render only the first match*/>
                <Route exact path="/" component={App} />
                <Route path="/todo/:itemid" component={TodoListItem} />
                <Route exact path="/about" component={About} />
            </Switch>   
        </div>
    </BrowserRouter>
    ,
    document.getElementById('root'));
registerServiceWorker();


