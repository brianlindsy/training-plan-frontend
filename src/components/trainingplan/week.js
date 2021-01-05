import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Day from './day.js'
import './trainingplan.css';

export default class Week extends React.Component {
  	render() {
      console.log(this.props.days);
  		const renderedDays = this.props.days.map((day) => 
        <Day day={day}
          key={day.id}
          handleWorkoutTextChange={this.props.handleWorkoutTextChange}
          handleReviewTextChange={this.props.handleReviewTextChange} />
      );
      return (
        <div id={"Week" + this.props.weekNumber}>
        <label>Week {this.props.weekNumber}</label>
            <div class="d-flex flex-row flex-nowrap overflow-auto">
              {renderedDays}
            </div>
        </div>
      );
	  }

	parseDate(date){
		var jsDate = new Date(date);

		return jsDate.toDateString();
	}
}