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
                <form className='col-md-4 col-md-offset-4'>
                    <input 
                        type= 'text'
                        className= 'form-control'
                        value= {this.state.term}
                        placeholder= "Search for a Todo"
                        onChange= {event => this.onInputChange(event.target.value)}/>
                    
                    
                </form>
            </div>
        );
    }


}

export default SearchBar;