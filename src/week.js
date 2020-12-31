import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Day from './day.js'

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
        <div>
          <label>Week {this.props.weekNumber}</label>
          <div className="card-deck">
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