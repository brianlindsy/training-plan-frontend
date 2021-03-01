import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default class ChangePlanVisibilityButton extends React.Component {
	constructor(props) {
    super(props);
    this.handleChangePlanVisibilityOnClick = this.handleChangePlanVisibilityOnClick.bind(this);
  }

  handleChangePlanVisibilityOnClick(e){
    this.props.handleChangePlanVisibilityOnClick(e.target.innerHTML, this.props.plan);
  }

	render(){
		return (
		<div className="dropdown mt-1 ml-2">
		  <button class="btn btn-secondary dropdown-toggle bg-primary" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Change plan visibility</button>
		  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li className="dropdown-item" id="planVisibilityPrivate" value="false" onClick={this.handleChangePlanVisibilityOnClick}>Private</li>
            <li className="dropdown-item" id="planVisibilityPublic" value="true" onClick={this.handleChangePlanVisibilityOnClick}>Public</li>
          </div>
        </div>
		);
	}
}