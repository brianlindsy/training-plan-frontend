import React from 'react';
import Workout from './workout.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './trainingplan.css';

export default class Day extends React.Component {

    constructor(props) {
      super(props);
      this.cardColor = this.cardColor.bind(this);
    }

    cardColor(day){
      if(day.workout.workoutType.workoutTypeName !== undefined){
        var workoutTypeName = day.workout.workoutType.workoutTypeName;
        if(workoutTypeName === "EASY"){
          return "border-easy-run";
        } else if(workoutTypeName === "MODERATE"){
          return "border-moderate-run";
        } else if(workoutTypeName === "LONG"){
          return "border-long-run";
        } else if(workoutTypeName === "SPEED"){
          return "border-speed-run";
        } else if (workoutTypeName === "REST"){
          return "border-rest";
        } else if (workoutTypeName === "TEMPO"){
          return "border-tempo-run";
        }
      }
    }

  	render() {
  		return (
    		  <div className={"card " + this.cardColor(this.props.day)} key={this.props.day.id}>
            <h6 className="card-header font-weight-light">{this.parseDate(this.props.day.date)}</h6>
  				  <Workout handleWorkoutTextChange={this.props.handleWorkoutTextChange}
                      handleUserLogTextChange={this.props.handleUserLogTextChange}
                      handleWorkoutCoachNotesTextChange={this.props.handleWorkoutCoachNotesTextChange}
                      day={this.props.day} key={this.props.day.workout.id}
                      runTypes={this.props.runTypes} 
                      handleRunTypeClick={this.props.handleRunTypeClick}/>
          </div>
  		);
	}

	parseDate(date){
		var jsDate = new Date(date);

		return jsDate.toDateString();
	}
}