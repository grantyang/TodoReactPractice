import React from 'react';

const SearchBar = ({term, setSearchTerm}) => {
  return (
    <div className="row justify-content-center">
      <input
        type="text"
        className="form-control input col-sm-6 search"
        value={term}
        placeholder="Search for a Todo"
        onChange={event => setSearchTerm(event.target.value)}
      />
    </div>
  );
}


export default SearchBar;
