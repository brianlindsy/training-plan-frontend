import React from 'react';
import Workout from './workout.js';
import Review from './review.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './trainingplan.css';

export default class Day extends React.Component {
  	render() {
  		return (
    		  <div className="card" key={this.props.day.id}>
          <h6 className="card-title font-weight-light">{this.parseDate(this.props.day.date)}</h6>
  				  <div className="card-body">
              <div className="form-group">
  					    <Workout handleWorkoutTextChange={this.props.handleWorkoutTextChange} day={this.props.day} key={this.props.day.workout.id} />
  					    <Review handleReviewTextChange={this.props.handleReviewTextChange} day={this.props.day} key={this.props.day.review.id} />
              </div>
            </div>
          </div>
  		);
	}

	parseDate(date){
		var jsDate = new Date(date);

		return jsDate.toDateString();
	}
}