import React from 'react';
import GoogleLogin from 'react-google-login';



export default class CreateCoach extends React.Component {
	
	render(){
		return (
			<div>
			<body>
  <div class="container">
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div class="card card-signin flex-row my-5">
          <div class="card-img-left d-none d-md-flex">
          </div>
          <div class="card-body">
            <h5 class="card-title text-center">Register and Login with Google!</h5>
            <form class="form-signin">
              <hr class="my-4"/>
              <GoogleLogin
    			clientId="108407451290-hd8mqsfspv06l5al3ucvm7crd40i94l3.apps.googleusercontent.com"
    			buttonText="Login to Track My Athlete with Google"
    			onSuccess={this.props.signInOrCreateCoach}
    			onFailure={this.props.signInOrCreateCoach}
    			cookiePolicy={'single_host_origin'}
  				/>
             </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</div>
);
	}

}