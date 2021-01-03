import React from 'react';

export default class NavBarTopGreeting extends React.Component {
	render() {
		return (
          <>
          	<a class="navbar-brand text-white" href="/">Welcome Coach {this.props.coach.givenName}!</a>
            <img class="img-thumbnail" style={{height: '25%'}} src={this.props.coach.pictureUrl} />
          </>
        );
    }
}