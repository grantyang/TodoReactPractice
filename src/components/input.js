import React, {Component} from 'react';

export default class Input extends Component{
    constructor(props){
        super(props);

        this.state = {todo: ''}; // init state to blank
        //this.onInputChange = this.onInputChange.bind(this); // bind context to this
        //this.onInputSubmit = this.onInputSubmit.bind(this);
    }


    onInputChange = (event) => {  // when input is changed, update state
        // console.log(event.target.value);
        this.setState({todo: event.target.value});
    }

    onInputSubmit = (event) => {   // when input is submitted, add to state
        event.preventDefault();
        this.props.onTodoSubmit(this.state.todo);
        this.setState({todo:''});   //clears out input after submit
    }


    render(){
        return(
            <form onSubmit= {this.onInputSubmit}>
                <input 
                    placeholder= 'Input list items here'
                    value= {this.state.todo}        // grab value from state
                    onChange= {this.onInputChange}  // update state on change
                    />            

                <span>
                    <button type= "submit">Add</button>
                </span>
            </form>
        );
    }


}

