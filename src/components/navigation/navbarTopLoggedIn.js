import React from 'react';
import NavBarTopGreeting from '../navigation/navbartopgreeting.js';
import config from '../../config.json';
import { GoogleLogout } from 'react-google-login';
import PlanVisibility from './planVisibility.js';

function NavBarTopLoggedIn(props) {
      return (
      <div>
       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <a className="navbar-brand" href="/">
                <a className="navbar-brand ml-1" href="/">{config.WEBSITE_NAME}</a>
              </a>
              <div className="navbar-nav ml-auto text-center">
                <NavBarTopGreeting user={props.user}/>
              </div>
              <div className="navbar-nav ml-auto">
                <PlanVisibility plan={props.plan}/>
                <GoogleLogout
                  clientId={config.GOOGLE_CLIENT_ID}
                  buttonText="Logout"
                  onLogoutSuccess={props.handleLogout}
                />
              </div>
            </nav>
      </div>
      );
} export default NavBarTopLoggedIn;