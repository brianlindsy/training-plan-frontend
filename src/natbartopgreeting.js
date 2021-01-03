import React from 'react';

export default class NavBarTopGreeting extends React.Component {
	render() {
		return (
          <div>
            <a class="navbar-brand text-white ml-1" href="/">Welcome {this.props.coach.givenName + " " + this.props.coach.familyName}</a>
            <img src={this.props.coach.pictureUrl} alt="" class="img-thumbnail"/>
          </div>
        );
    }
}