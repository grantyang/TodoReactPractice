import React, {Component} from 'react';

export default class Input extends Component{
    constructor(props){
        super(props);
        this.state = {todo: ''}; // init state to blank
        //this.onInputChange = this.onInputChange.bind(this); // bind context to this
        //this.onInputSubmit = this.onInputSubmit.bind(this);
    }

    onInputChange = (event) => {  // when input is changed, update state
        this.setState({todo: event.target.value});
    }

    onInputSubmit = (event) => {   // when input is submitted, add to App state
        event.preventDefault();
        this.props.onTodoSubmit(this.state.todo);
        this.setState({todo:''});   //clears out input after submit
    }

    render(){
        return(
            <div className='col-md-12'>
            <form className='input input-group col-md-2 col-md-offset-5' onSubmit= {this.onInputSubmit}>
                <input 
                    type='text'
                    className= 'form-control'
                    placeholder= 'Input new Todos here'
                    value= {this.state.todo}        // grab value from state
                    onChange= {this.onInputChange}  // update state on change
                    />            
                <span className='input-group-btn'>
                    <button className='btn btn-success' type= "submit">Add</button>
                </span>
            </form>
            </div>
        );
    }
}

