import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='col-md-2 col-md-offset-5'>
                    <input 
                        type= 'text'
                        className= 'form-control'
                        value= {this.props.term}
                        placeholder= "Search for a Todo"
                        onChange= {event => this.props.setSearchTerm(event.target.value)}/>
            </div>
        );
    }
}

export default SearchBar;