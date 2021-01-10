import React from 'react';
import NavBarTopGreeting from '../navigation/navbartopgreeting.js';
import config from '../../config.json';

export default class NavBarTop extends React.Component {
	render() {
    if(this.props.coach === undefined){
		  return (
			  <div>
			  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <a className="navbar-brand text-white ml-1" href="/">{config.WEBSITE_NAME}</a>
            </nav>
        </div>
        );
    } else {
      return (
      <div>
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <a className="navbar-brand" href="/">
                <a className="navbar-brand text-white ml-1" href="/">{config.WEBSITE_NAME}</a>
              </a>
              <NavBarTopGreeting coach={this.props.coach}/>
            </nav>
            </div>
      );
    }
  }
}