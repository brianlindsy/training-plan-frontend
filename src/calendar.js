import React from 'react';
import Week from './week.js';
import AddWeekButton from './addWeekButton.js';
import 'bootstrap/dist/css/bootstrap.css';

export default class Calendar extends React.Component {
  	render() {
      const renderedWeeks = this.props.plan.weeks.map((week, weekNumber) =>
          <Week key={week.id} days={week.days} className="card-deck" weekNumber={weekNumber+1}
                handleWorkoutTextChange={this.props.handleWorkoutTextChange}
                handleReviewTextChange={this.props.handleReviewTextChange}/>
      );
    	return (
    		<div>
          {renderedWeeks}
          <AddWeekButton handleAddNewWeekOnClick={this.props.handleAddNewWeekOnClick} />
        </div>
    	);
  	}
}