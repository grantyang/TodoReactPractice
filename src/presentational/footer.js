import React from 'react';
import { Link } from 'react-router-dom';

const Footer = props => {
  return (
    <div>
      <div className="row justify-content-center">
        <button className="btn btn-footer btn-secondary" onClick={props.clear}>
          Clear All
        </button>
        <button
          className="btn btn-footer btn-secondary"
          onClick={props.clearComplete}>
          Clear Completed
        </button>
      </div>
      <div className="row justify-content-center">
        <button
          className="btn btn-footer btn-secondary"
          onClick={props.showAll}>
          Show All
        </button>
        <button
          className="btn btn-footer btn-secondary"
          onClick={props.showCompleted}>
          Show Completed
        </button>
        <button
          className="btn btn-footer btn-secondary"
          onClick={props.showActive}>
          Show Active
        </button>
      </div>
      <div className="row justify-content-center">
        <p className="counter">Items Left: {props.countCompleted()}</p>
      </div>
      <div className="row justify-content-center">
        <Link
          className="btn col-sm-3 btn-item btn-warning"
          to={`/list/${props.listName}/edit`}>
          Edit List
        </Link>
        <button
          type="button"
          className="btn col-sm-3 btn-item btn-warning"
          data-toggle="modal"
          data-target="#addAuthorizedUser">
          Add Authorized User
        </button>
        <div id="addAuthorizedUser" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label className="form-control-label">
                      Enter user's email:
                    </label>
                    <input
                      className="form-control"
                      value={props.authorizedUserInput}
                      onChange={props.onAuthorizedUserInputChange}
                      id="authorizedUser"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success mx-2 float-right"
                    data-dismiss="modal"
                    onClick={props.onAuthorizedUserInputSubmit}>
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary float-right"
                    data-dismiss="modal">
                    Close
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <Link className="btn col-sm-4 btn-item btn-primary " to="/">
          Return Home
        </Link>
      </div>
    </div>
  );
};
export default Footer;
