import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

const isAuthenticated = () => { 
  fetch('http://localhost:5000/user',{
  method: 'GET',
  credentials: 'include'
})
  .then(res => {
    if (res.status===403) { //if error code is returned, then user is not logged in
      return 
    }
    return res.json();
  })
  .then(user => {
    if (user) { //otherwise, if there is a valid user logged in
      return true
    }
    alert('Please log in to view that page')
    return false
  })
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => ( // what is this render={props => ... } doing? what is set as props
      isAuthenticated ? ( //GY !!!!!!!
        <Component {...props}/>
        
      ) : (
        <Redirect to={{
          pathname: '/login',
          //state: { from: props.location } //what is this doing? 
          //https://stackoverflow.com/questions/39847360/how-to-pass-state-props-when-redirecting-to-another-route-in-react
        }}/>
      )
    )}/>
  )
  
  export default PrivateRoute