import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row justify-content-sm-center">
        <input
          type="text"
          className="form-control col-sm-6 search"
          value={this.props.term}
          placeholder="Search for a Todo"
          onChange={event => this.props.setSearchTerm(event.target.value)}
        />
      </div>
    );
  }
}

export default SearchBar;
