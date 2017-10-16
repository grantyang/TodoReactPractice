import React, {Component} from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom'

export default class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activeSession: false,
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/user',{
      method: 'GET',
      credentials: 'include'
    })
      .then(res => {
        if (res.status===403) { //if error code is returned, then user is not logged in
          this.setState({
            loading: false,
            activeSession: false
          })
          return alert('Please log in to view that page')        
        }
        return res.json();          
      })
      .then(user => {
        if (user) { //otherwise, there is a valid user logged in
          return this.setState({
            loading: false,            
            activeSession: true
          })
        }
      })
    }

    privateRoute = ({ component: Component, ...rest }) => {     
      if (this.state.activeSession) {
        return <Route {...rest} render={props => ( <Component {...props}/>)}/>
      }
      else{
        return <Route {...rest} render={props => ( <Redirect to={{pathname: '/login'}}/>)}/>            
      }
    }

    render(){
      const newRoute = this.privateRoute(this.props); 
      if (this.state.loading){ 
        return <h1>Please wait, loading...</h1>;   }   
      return (
        newRoute
      )
    }
  }

