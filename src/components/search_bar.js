import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state = {term: ''};
    }

    onInputChange = (term) => this.setState({term})

    onSearchSubmit = (event) => {
        event.preventDefault();
        this.props.setSearch(this.state.term); //search for term
        this.setState({term: ''}); //clear out search term
    }

    render(){
        return (
            <div>
                <form onSubmit= {this.onSearchSubmit}>
                    <input 
                        value = {this.state.term}
                        placeholder= "Search for a Todo"
                        onChange = {event => this.onInputChange(event.target.value)}/>
                </form>
            </div>
        );
    }


}

export default SearchBar;