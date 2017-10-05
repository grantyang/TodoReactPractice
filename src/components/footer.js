import React, {Component} from 'react';

const Footer = props => {
    return(
        <div >
        <div className="row justify-content-sm-center">
            <button className="btn btn-footer btn-secondary" onClick={props.clear}>Clear All</button>
            <button className="btn btn-footer btn-secondary" onClick={props.clearComplete}>Clear Completed</button>
         </div>
        <div className="row justify-content-sm-center">
            <button className="btn btn-footer btn-secondary" onClick={props.showAll}>Show All</button>
            <button className="btn btn-footer btn-secondary" onClick={props.showCompleted}>Show Completed</button>
            <button className="btn btn-footer btn-secondary" onClick={props.showActive}>Show Active</button>
        </div>
        <div className="row justify-content-sm-center">
                    
            <p className="counter">Items Left: {props.count()}</p>
        </div>
        </div>
    );
}
export default Footer;
