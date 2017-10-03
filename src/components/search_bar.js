import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {term: ''};
    }

    onInputChange = (term) => {
        this.setState({term})
        this.props.setSearch(term);
    }

    render(){
        return (
            <div className='col-md-2 col-md-offset-5'>
                    <input 
                        type= 'text'
                        className= 'form-control'
                        value= {this.state.term}
                        placeholder= "Search for a Todo"
                        onChange= {event => this.onInputChange(event.target.value)}/>
            </div>
        );
    }
}

export default SearchBar;