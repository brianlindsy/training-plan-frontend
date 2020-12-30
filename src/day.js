import React from 'react';
import Workout from './workout.js';
import Review from './review.js';
import 'bootstrap/dist/css/bootstrap.css';

export default class Day extends React.Component {
  	render() {
  		return (
    		<div className="card" key={this.props.value}>
  				<div className="card-body">
    			<h5 className="card-title">{this.parseDate(this.props.value.date)}</h5>
    			<form>
  					<Workout handleWorkoutTextChange={this.props.handleWorkoutTextChange} value={this.props.value.workout} key={this.props.value.workout.id} />
  					<Review handleReviewTextChange={this.props.handleReviewTextChange} value={this.props.value.review} key={this.props.value.review.id} />
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