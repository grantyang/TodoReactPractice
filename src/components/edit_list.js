import React, {Component} from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom'; 
import Input from './input.js';


export default class EditList extends Component {
    componentDidMount(){
        fetch(`http://localhost:5000/list/${this.getListName()}`,{ 
          method: 'GET'})
        .then(res => { return res.json()})
        .then( returnedList => {
          this.setState({    
            loading: false   
          });
        })
      }

      constructor(props){
        super(props);
        this.state = {
                      loading: true,
                    }; 
    }
                    
    getListName = () => {
        return this.props.match.params.listName;   
    }

    changeName = (name) => { //change name of this list
          fetch(`http://localhost:5000/list/${this.getListName()}`,{
            method: 'PUT', 
            body: JSON.stringify({name}),
            headers: {
              'Accept': 'application/json', // this is what i expect to recive from the server
              'Content-Type': 'application/json' // This is what i am sending to the server
            }
          })
          .then(res => { return res.json()})
          .then(()=>{
            window.location.replace(`http://localhost:3000/list/${name}`) //route back to list GY React router
          })
        }
    
    delete = () => {      //delete this list and return to homepage
        fetch(
            `http://localhost:5000/list/${this.getListName()}`,
            {method: 'DELETE'})
            .then(() => {
            window.location.replace(`http://localhost:3000/`) //GY React router
            })
        .catch(error => {
            return error;
        })
    }  

    render(){
        if (this.state.loading === true){
            return <b>Please wait, loading...</b>
        }
        else{
            return(
                <div className="List">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2 className="Header-text">Editing: {this.getListName()}</h2>
                    </div>
                    <div>
                        <b>Change Name to:</b> <Input fxToRun= {this.changeName} /*pass addToList as prop*/ />
                        <button className= 'btn btn-item col-md-2 col-md-offset-5 btn-danger' onClick= {() => this.delete()}>
                        Delete
                        </button>
                        <Link className= "col-md-2 col-md-offset-5 btn btn-item btn-primary" to={`/list/${this.getListName()}`}> Return to List </Link>
                    </div>
                </div>
            );
        }
    }
}