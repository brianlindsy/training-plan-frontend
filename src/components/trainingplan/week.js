import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Day from './day.js'
import './trainingplan.css';

export default class Week extends React.Component {

    trainingPhase(week){
      if (week.weeklySummary.trainingPhase !== null){
        return <span class="badge badge-pill badge-secondary">Training Phase Here</span>;
      }
    }
  	render() {
  		const renderedDays = this.props.week.days.map((day) => 
        <Day day={day}
          key={day.id}
          handleWorkoutTextChange={this.props.handleWorkoutTextChange}
          handleUserLogTextChange={this.props.handleUserLogTextChange}
          handleWorkoutCoachNotesTextChange={this.props.handleWorkoutCoachNotesTextChange}
          runTypes={this.props.runTypes} 
          handleRunTypeClick={this.props.handleRunTypeClick}/>
      );
      return (
        <div id={"Week" + this.props.weekNumber}>
        <h3>Week {this.props.weekNumber}  {this.trainingPhase(this.props.week)}</h3>
            <div className="d-flex flex-row flex-nowrap overflow-auto">
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