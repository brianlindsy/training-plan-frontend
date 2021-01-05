import React from 'react';

export default class NavBarTopGreeting extends React.Component {
	render() {
		return (
          <>
          	<a class="navbar-brand text-white" href="/">Welcome Coach {this.props.coach.givenName}!</a>
            <img class="img-circle" alt="Coach" width="32" height="32" src={this.props.coach.pictureUrl} />
          </>
        );
    }
}