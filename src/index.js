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
import PrivateRoute from './components/private_route.js'
// const AuthExample = () => (
//     <Router>
//       <div>
//         <AuthButton/>
//         <ul>
//           <li><Link to="/public">Public Page</Link></li>
//           <li><Link to="/protected">Protected Page</Link></li>
//         </ul>
//         <Route path="/public" component={Public}/>
//         <Route path="/login" component={Login}/>
//         <PrivateRoute path="/protected" component={Protected}/>
//       </div>
//     </Router>
//   )


ReactDOM.render(
    <BrowserRouter>
        <div  /*if user is on path, show component  <App /> */>
            <Switch /*Takes in Routes and will render only the first match*/>
                <Route exact path="/" component={App} />
                <PrivateRoute path="/list/edit/:listName/" component={EditList} />
                <PrivateRoute path="/list/:listName/todo/:itemId/edit" component={TodoListItemEdit} />
                <PrivateRoute path="/list/:listName/todo/:itemId" component={TodoListItem} />
                <PrivateRoute path="/list/:listName" component={List} />
                <PrivateRoute path="/profile/edit" component={ProfileEdit} />     
                <PrivateRoute path="/profile/" component={Profile} />     
                <Route exact path="/signup" component={SignUp} />     
                <Route exact path="/login" component={Login} />       
                <Route exact path="/about" component={About} />      
            </Switch>   
        </div>
    </BrowserRouter>
    ,
    document.getElementById('root'));
registerServiceWorker();


