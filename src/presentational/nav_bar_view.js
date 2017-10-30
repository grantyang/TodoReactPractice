import React from 'react';

const NavBarView = props => {
  let homeActive = '';
  let aboutActive = '';
  if (props.currentPath === 'http://localhost:3000/about') {
    homeActive = '';
    aboutActive = 'active';
  }
  if (props.currentPath === 'http://localhost:3000/') {
    homeActive = 'active';
    aboutActive = '';
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
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
          <li className={`nav-item ${homeActive}`}>
            <a className="nav-link" href="/">
              Home <span className="sr-only" />
            </a>
          </li>
          <li className={`nav-item ${aboutActive}`}>
            <a className="nav-link" href="/about">
              About Us
            </a>
          </li>
        </ul>
        {props.activeSession && (
          <span className="form-inline my-2 my-lg-0">
            <a className="btn btn-info mr-2 my-2 my-sm-0" href="/profile">
              Profile
            </a>

            <a
              className="btn btn-secondary mr-2 my-2 my-sm-0"
              href="/"
              onClick={props.deleteCookie}>
              Sign Out
            </a>
          </span>
        )}
        {!props.activeSession && (
          <span className="form-inline my-2 my-lg-0">
            <a className="btn btn-primary mr-2 my-2 my-sm-0" href="/login">
              Login
            </a>

            <a className="btn btn-success mr-2 my-2 my-sm-0" href="/signup">
              Sign Up
            </a>
          </span>
        )}
      </div>
    </nav>
  );
};
export default NavBarView;
