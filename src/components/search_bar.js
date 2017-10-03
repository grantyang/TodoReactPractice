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


//     <div class="row">
//     <div class="col-lg-6">
//       <div class="input-group">
//         <span class="input-group-btn">
//           <button class="btn btn-secondary" type="button">Go!</button>
//         </span>
//         <input type="text" class="form-control" placeholder="Search for..." aria-label="Search for...">
//       </div>
//     </div>
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
        return (
            <div className='row'>
                <form className='col-md-4 col-md-offset-4' onSubmit= {this.onSearchSubmit}>
                    <input 
                        type= 'text'
                        className= 'form-control'
                        value= {this.state.term}
                        placeholder= "Search for a Todo"
                        onChange= {event => this.onInputChange(event.target.value)}/>
                    <span className='input-group-btn'>
                        <button className='btn btn-secondary' type="button"> Search </button>
                    </span>
                    <button onClick= {() => this.props.setSearch()}> Clear Search </button>
                </form>
            </div>
        );
    }


}

export default SearchBar;