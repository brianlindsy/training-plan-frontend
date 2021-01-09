import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import RunTypeDropdown from '../navigation/runtypedropdown.js';

export default class Workout extends React.Component {
	constructor(props) {
    super(props);
    this.handleWorkoutTextChange = this.handleWorkoutTextChange.bind(this);
    this.handleUserLogTextChange = this.handleUserLogTextChange.bind(this);
    this.handleWorkoutCoachNotesTextChange = this.handleWorkoutCoachNotesTextChange.bind(this);
    this.cardTitle = this.cardTitle.bind(this);
    this.timeout = 0;
  }
  
  handleWorkoutTextChange(e) {
  	if(this.timeout) clearTimeout(this.timeout);
  	this.timeout = setTimeout(() => {
      this.props.handleWorkoutTextChange(e.target.value, this.props.day);
    }, 1000);
  }

  handleUserLogTextChange(e) {
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.handleUserLogTextChange(e.target.value, this.props.day);
    }, 1000);
  }

  handleWorkoutCoachNotesTextChange(e){
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.handleWorkoutCoachNotesTextChange(e.target.value, this.props.day);
    }, 1000);
  }

  cardTitle(workout){
    if(workout.workoutType.workoutTypeName !== undefined){
      var workoutTypeName = workout.workoutType.workoutTypeName;
      return workoutTypeName;
    }
  }

	render(){
		return (
        <>
        <div>
			    <h5 class="card-title text-center">{this.cardTitle(this.props.day.workout)}</h5>
          <RunTypeDropdown day={this.props.day} runTypes={this.props.runTypes} 
                            handleRunTypeClick={this.props.handleRunTypeClick}/>
        </div>
        <div className="card-body">
          <div className="col">
            <label htmlFor="workoutInput">Todays Workout</label>
    		    <textarea rows="5" type="text" class="form-control border-0"
                  onChange={this.handleWorkoutTextChange}>
                  {this.props.day.workout.description}
            </textarea>
          </div>
          <div className="form-group row">
            <div className="col">
              <label htmlFor="reviewInput">Athlete Log Entry</label>
              <textarea rows="5" type="text" class="form-control border-0"
               onChange={this.handleUserLogTextChange}>
               {this.props.day.workout.userLogEntry}
              </textarea>
            </div>
            <div className="col">
              <label htmlFor="workoutInput">Coaching Notes</label>
              <textarea rows="5" type="text" class="form-control border-0"
                  onChange={this.handleWorkoutCoachNotesTextChange}>
                  {this.props.day.workout.workoutType.workoutTypeDescription}
              </textarea>
            </div>
          </div>
        </div>
        </>
		);
	}
}