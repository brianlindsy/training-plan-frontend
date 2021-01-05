import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default class AddWeekButton extends React.Component {
	constructor(props) {
    super(props);
    this.handleAddNewWeekOnClick = this.handleAddNewWeekOnClick.bind(this);
  }

  handleAddNewWeekOnClick(){
    this.props.handleAddNewWeekOnClick();
  }

	render(){
		return (
		  <button onClick={this.handleAddNewWeekOnClick} type="button" className="btn btn-primary mt-3 ml-2">Add New Week +</button>
		);
	}
}