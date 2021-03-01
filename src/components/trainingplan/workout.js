import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import RunTypeDropdown from '../navigation/runtypedropdown.js';
import EdiText from 'react-editext';

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
      this.props.handleWorkoutTextChange(e, this.props.day);
    }, 1000);
  }

  handleUserLogTextChange(e) {
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.handleUserLogTextChange(e, this.props.day);
    }, 1000);
  }

  handleWorkoutCoachNotesTextChange(e){
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.handleWorkoutCoachNotesTextChange(e, this.props.day);
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
          <div className="row justify-content-md-center">
			      <h5 class="card-title text-center mr-2">{this.cardTitle(this.props.day.workout)}</h5>
            <RunTypeDropdown day={this.props.day} runTypes={this.props.runTypes} 
                            handleRunTypeClick={this.props.handleRunTypeClick}/>
          </div>
        </div>
        <div className="card-body">
          <div className="form-group justify-content-md-center mb-5">
            <h6 htmlFor="workoutInput">Todays Workout</h6>
    		    <EdiText type='textarea'
                inputProps={{
                  className: 'textarea',
                  placeholder: 'Type your content here',
                  style: {
                    outline: 'none',
                    minWidth: 'auto'
                  },
                  rows: 5
                }}
                value={this.props.day.workout.description}
                onSave={this.handleWorkoutTextChange}/>
          </div>
          <div className="form-group justify-content-md-center mb-5">
              <h6 htmlFor="reviewInput">Athlete Log Entry</h6>
              <EdiText type='textarea'
                inputProps={{
                  className: 'textarea',
                  placeholder: 'Type your content here',
                  style: {
                    outline: 'none',
                    minWidth: 'auto'
                  },
                  rows: 5
                }}
                value={this.props.day.workout.userLogEntry}
                onSave={this.handleUserLogTextChange}/>
          </div>
          <div className="form-group justify-content-md-center">
              <h6 htmlFor="workoutInput">Coaching Notes</h6>
              <EdiText type='textarea'
                inputProps={{
                  className: 'textarea',
                  placeholder: 'Type your content here',
                  style: {
                    outline: 'none',
                    minWidth: 'auto'
                  },
                  rows: 5
                }}
                value={this.props.day.workout.workoutType.workoutTypeDescription}
                onSave={this.handleWorkoutCoachNotesTextChange}/>
          </div>
        </div>
        </>
		);
	}
}