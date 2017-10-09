import React from 'react';

const NavBar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Grant's TodoLists
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">
              About Us
            </a>
          </li>
        </ul>
        <span className="form-inline my-2 my-lg-0">
          <a className="btn btn-primary mr-2 my-2 my-sm-0" href="/login">
            Login
          </a>
          <a className="btn btn-success mr-2 my-2 my-sm-0" href="/signup">
            Sign Up
          </a>
        </span>
      </div>
    </nav>
  );
};
export default NavBar;
