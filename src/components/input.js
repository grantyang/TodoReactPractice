import React, {Component} from 'react';

//single text input form
//onSubmit f(x)

export default class Input extends Component{
    constructor(props){
        super(props);
        this.state = {text: ''}; // init state to blank
        //this.onInputChange = this.onInputChange.bind(this); // bind context to this
        //this.onInputSubmit = this.onInputSubmit.bind(this);
    }

    onInputChange = (event) => {  // when input is changed, update state
        this.setState({text: event.target.value});
    }

    onInputSubmit = (event) => {   // when input is submitted, run fx
        event.preventDefault();
        this.props.fxToRun(this.state.text);
        this.setState({text:''});   //clears out input after submit
    }

    render(){
        return(
            <div className='col-md-12'>
            <form className='input input-group col-md-2 col-md-offset-5' onSubmit= {this.onInputSubmit}>
                <input 
                    type='text'
                    className= 'form-control'
                    placeholder= 'Input text here'
                    value= {this.state.text}        // grab value from state
                    onChange= {this.onInputChange}  // update state on change
                    />            
                <span className='input-group-btn'>
                    <button className='btn btn-success' type= "submit">Submit</button>
                </span>
            </form>
            </div>
        );
    }
}

