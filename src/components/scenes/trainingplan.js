import React from 'react';
import Calendar from '../trainingplan/calendar.js';
import AddWeekButton from '../buttons/addWeekButton.js';
import SkipToWeek from '../navigation/skiptoweek.js';
import {withRouter} from "react-router-dom";

class TrainingPlan extends React.Component {
    constructor(props) {
      super(props);
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.timeout = 0;
    }
    
  	componentDidMount() {
      if(this.props.match.params.planId != null){
        this.props.loadTrainingPlan(this.props.match.params.planId);
      } else {
        this.props.createNewTrainingPlan();
      }
  	}

    handleTitleChange(e) {
      if(this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.props.handleTitleChange(e.target.value, this.props.plan);
      }, 1000);
    }

  	render() {
      console.log("plan: " + JSON.stringify(this.props.plan));
    	return (
      		<div className="col">
            <div className="alert alert-success alert-dismissable" style={{display: 'none'}} id="success-alert">
              <button type="button" className="close" data-dismiss="alert">x</button>
              <strong>Success! </strong> Your information has been saved.
            </div>
            <SkipToWeek plan={this.props.plan}/>
            <div className="container text-center">
              <textarea rows="1" cols="50" style={{'fontSize': "22pt","textAlign": "center"}}
                        class="border-0 font-weight-light"
                        onChange={this.handleTitleChange}
                        defaultValue={this.props.plan.title}>
              </textarea>
            </div>
          	<Calendar handleReviewTextChange={this.props.handleReviewTextChange}
          				      handleWorkoutTextChange={this.props.handleWorkoutTextChange}
          				      plan={this.props.plan}
                        handleAddNewWeekOnClick={this.props.handleAddNewWeekOnClick}/>
            <AddWeekButton handleAddNewWeekOnClick={this.props.handleAddNewWeekOnClick} />
          </div>
    	);
  	}
}
export default withRouter(TrainingPlan);