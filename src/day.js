import React from 'react';
import Workout from './workout.js';
import Review from './review.js';
import 'bootstrap/dist/css/bootstrap.css';

export default class Day extends React.Component {
  	render() {
  		return (
    		  <div className="card" key={this.props.day.id}>
  				  <div className="card-body">
    			    <h5 className="card-title">{this.parseDate(this.props.day.date)}</h5>
              <form>
  					    <Workout handleWorkoutTextChange={this.props.handleWorkoutTextChange} day={this.props.day} key={this.props.day.workout.id} />
  					    <Review handleReviewTextChange={this.props.handleReviewTextChange} day={this.props.day} key={this.props.day.review.id} />
				      </form>
  				  </div>
          </div>
  		);
	}

	parseDate(date){
		var jsDate = new Date(date);

		return jsDate.toDateString();
	}
}