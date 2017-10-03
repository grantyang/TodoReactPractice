import React, {Component} from 'react';

export default class Footer extends Component {
    render(){
        return(
            <div className="col-md-12">
                <button className="btn btn-footer btn-default" onClick={this.props.clear}>Clear All</button>
                <button className="btn btn-footer btn-default" onClick={this.props.clearComplete}>Clear Completed</button>
                <button className="btn btn-footer btn-default" onClick={this.props.showAll}>Show All</button>
                <button className="btn btn-footer btn-default" onClick={this.props.showCompleted}>Show Completed</button>
                <button className="btn btn-footer btn-default" onClick={this.props.showActive}>Show Active</button>
                <p>Items Left: {this.props.count()}</p>
            </div>

        );
   }
}