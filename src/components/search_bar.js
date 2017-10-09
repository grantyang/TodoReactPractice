import React, { Component } from 'react';

const SearchBar = ({term, setSearchTerm}) => {
  return (
    <div className="row justify-content-sm-center">
      <input
        type="text"
        className="form-control col-sm-6 search"
        value={term}
        placeholder="Search for a Todo"
        onChange={event => setSearchTerm(event.target.value)}
      />
    </div>
  );
}


export default SearchBar;
