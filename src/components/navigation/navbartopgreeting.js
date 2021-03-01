import React from 'react';

export default class NavBarTopGreeting extends React.Component {
	render() {
		return (
          <>
          	<a class="navbar-brand text-white" href="/">Welcome {this.props.user.givenName}!</a>
            <img class="img-circle" alt="User" width="32" height="32" src={this.props.user.pictureUrl} />
          </>
        );
    }
}