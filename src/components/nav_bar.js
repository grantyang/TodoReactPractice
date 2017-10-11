import React, {Component} from 'react';
import NavBarView from '../presentational/nav_bar_view.js';


class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
  }
  
  deleteCookie = () => {
    document.cookie = 'userToken' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  render(){
    return (
      <NavBarView 
        deleteCookie={this.deleteCookie}
      />
    );
  }
};
export default NavBar;
