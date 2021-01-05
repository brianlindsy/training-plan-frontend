import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';

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
    }, 1000);
  }

	render(){
		return (
			<div className="form-group">
        <label htmlFor="workoutInput">Todays Workout</label>
    		<textarea rows="5" type="text" class="form-control border-0"
                  onChange={this.handleWorkoutTextChange}>
                  {this.props.day.workout.description}
        </textarea>
      </div>
		);
	}
}