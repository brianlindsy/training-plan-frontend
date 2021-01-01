import React from 'react';
import Calendar from './calendar.js';
import NavBarTop from './navbartop.js';
import {withRouter} from "react-router-dom";

class TrainingPlan extends React.Component {
    
  	componentDidMount() {
      this.props.loadTrainingPlan(this.props.match.params.planId);
  	}

  	render() {
    	return (
      		<div className="trainingPlan">
            <NavBarTop/>
            <div className="alert alert-success alert-dismissable" style={{display: 'none'}} id="success-alert">
              <button type="button" className="close" data-dismiss="alert">x</button>
              <strong>Success! </strong> Your information has been saved.
            </div>
            <div className="container-fluid">
          	  <Calendar handleReviewTextChange={this.props.handleReviewTextChange}
          				      handleWorkoutTextChange={this.props.handleWorkoutTextChange}
          				      plan={this.props.plan}
                        handleAddNewWeekOnClick={this.props.handleAddNewWeekOnClick}/>
      		  </div>
          </div>
    	);
  	}
}
export default withRouter(TrainingPlan);