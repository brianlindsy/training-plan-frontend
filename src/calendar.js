import React from 'react';
import Week from './week.js';
import 'bootstrap/dist/css/bootstrap.css';

export default class Calendar extends React.Component {
  	render() {
      const renderedWeeks = this.props.plan.weeks.map((week, weekNumber) =>
        <div className="row mt-2 mb-2 ml-1 mr-1">
          <Week key={week.id} days={week.days} className="card-deck" weekNumber={weekNumber+1}
                handleWorkoutTextChange={this.props.handleWorkoutTextChange}
                handleReviewTextChange={this.props.handleReviewTextChange}/>
        </div>
      );
    	return (
    		<div>{renderedWeeks}</div>
    	);
  	}
}