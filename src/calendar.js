import React from 'react';
import Day from './day.js';

export default class Calendar extends React.Component {

    // 1. need to figure out a way to sort days in ascending order, here is where i think
    // that should go
    // 2. shoud there be a concept of a week or should the card-deck div limit to
    // 7 cards per row to look like a week
  	render() {
    	const renderedWorkouts = this.props.plan.days.map((day) =>
  			<Day value={day}
  				key={day.id}
  				handleWorkoutTextChange={this.props.handleWorkoutTextChange}
  				handleReviewTextChange={this.props.handleReviewTextChange} />
  		);
    	return (
    		<div className="card-deck">
    			{renderedWorkouts}
    		</div>
    	);
  	}
}