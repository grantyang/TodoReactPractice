import React, {Component} from 'react';

export default class Footer extends Component {
    render(){
        return(
            <div>
                <button onClick={this.props.clear}>Clear All</button>
                <button onClick={this.props.clearComplete}>Clear Completed</button>
                <button onClick={this.props.showAll}>Show All</button>
                <button onClick={this.props.showCompleted}>Show Completed</button>
                <button onClick={this.props.showActive}>Show Active</button>
                <p>Items Left: {this.props.count()}</p>
            </div>

        );
   }
}