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

//     <div class="row">
//     <div class="col-lg-6">
//       <div class="input-group">
//         <input type="text" class="form-control" placeholder="Search for..." aria-label="Search for...">
//         <span class="input-group-btn">
//           <button class="btn btn-secondary" type="button">Go!</button>
//         </span>
//       </div>
//     </div>
//   </div>


    render(){
        return(
            <div className="row">
            <form className='input-group col-md-2 col-md-offset-5' onSubmit= {this.onInputSubmit}>
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

