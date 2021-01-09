import React from 'react';
import Week from './week.js';
import 'bootstrap/dist/css/bootstrap.css';

export default class Calendar extends React.Component {
  	render() {
      const renderedWeeks = this.props.plan.weeks.map((week, weekNumber) =>
          <Week key={week.id} days={week.days} className="card-deck" weekNumber={weekNumber+1}
                handleWorkoutTextChange={this.props.handleWorkoutTextChange}
                handleUserLogTextChange={this.props.handleUserLogTextChange}
                handleWorkoutCoachNotesTextChange={this.props.handleWorkoutCoachNotesTextChange}
                runTypes={this.props.runTypes}
                handleRunTypeClick={this.props.handleRunTypeClick}/>
      );
    	return (
    		<div>
          {renderedWeeks}
        </div>
    	);
  	}
}