import React from 'react';
import config from '../../config.json';
import GoogleLogin from 'react-google-login';
import PlanVisibility from './planVisibility.js';

function NavBarTopNotLoggedIn(props) {
		  return (
			  <div>
			  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <a className="navbar-brand ml-1" href="/">{config.WEBSITE_NAME}</a>
              <div className="navbar-nav ml-auto">
                <GoogleLogin
                  clientId={config.GOOGLE_CLIENT_ID}
                  buttonText={"Login with Google"}
                  onSuccess={props.signInOrCreateUser}
                  onFailure={props.signInOrCreateUser}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            </nav>
        </div>
        );
} export default NavBarTopNotLoggedIn;