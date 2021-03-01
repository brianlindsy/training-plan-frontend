import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default class AddNewTrainingPlanButton extends React.Component {
	constructor(props) {
    super(props);
    this.handleAddNewPlanOnClick = this.handleAddNewPlanOnClick.bind(this);
  }

  handleAddNewPlanOnClick(){
    this.props.handleAddNewPlanOnClick();
  }

	render(){
		return (
		  <button onClick={this.handleAddNewPlanOnClick} type="button" className="btn btn-primary ml-2">Add New Training Plan +</button>
		);
	}
}