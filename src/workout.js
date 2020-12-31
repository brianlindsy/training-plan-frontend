import React from 'react';

export default class Workout extends React.Component {
	constructor(props) {
    super(props);
    this.handleWorkoutTextChange = this.handleWorkoutTextChange.bind(this);
    this.timeout = 0;
  }
  
  handleWorkoutTextChange(e) {
  	if(this.timeout) clearTimeout(this.timeout);
  	this.timeout = setTimeout(() => {
      this.props.handleWorkoutTextChange(e.target.value, this.props.day);
    }, 500);
  }

	render(){
		return (
			<div className="form-group">
    		<label htmlFor="workoutInput">Workout</label>
    		<textarea type="form-text" className="form-control border-0" id="workoutInput"
    					onChange={this.handleWorkoutTextChange}>{this.props.day.workout.description}</textarea>
  			</div>
		);
	}
}