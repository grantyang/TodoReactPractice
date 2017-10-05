import React, {Component} from 'react';

export default class Footer extends Component {
    render(){
        return(
            <div >
            <div className="row justify-content-sm-center">
                <button className="btn btn-footer btn-secondary" onClick={this.props.clear}>Clear All</button>
                <button className="btn btn-footer btn-secondary" onClick={this.props.clearComplete}>Clear Completed</button>
             </div>
            <div className="row justify-content-sm-center">
                <button className="btn btn-footer btn-secondary" onClick={this.props.showAll}>Show All</button>
                <button className="btn btn-footer btn-secondary" onClick={this.props.showCompleted}>Show Completed</button>
                <button className="btn btn-footer btn-secondary" onClick={this.props.showActive}>Show Active</button>
            </div>
            <div className="row justify-content-sm-center">
                        
                <p className="counter">Items Left: {this.props.count()}</p>
            </div>
            </div>
        );
    }
}
