import React from 'react';
import NavBarTop from '../navigation/navbartop.js';
import SideBar from '../navigation/sidebar.js';
import TrainingPlan from './trainingplan.js';
import {withRouter} from "react-router-dom";

class CoachDashboard extends React.Component {

  componentDidMount(){
    const coachId = this.props.match.params.coachId;
    const planId = this.props.match.params.planId;
    this.props.loadCoach(coachId);
    this.props.loadTrainingPlan(planId);
  }

  	render() {
    	return (
      		<div className="coachDashboard">
                <NavBarTop coach={this.props.coach}/>
                <div class="d-flex" >
                <SideBar plans={this.props.coach.plans} coachId={this.props.match.params.coachId}
                          handleAddNewPlanOnClick={this.props.handleAddNewPlanOnClick}/>
          	    <TrainingPlan handleReviewTextChange={this.props.handleReviewTextChange}
          				            handleWorkoutTextChange={this.props.handleWorkoutTextChange}
                              handleWorkoutCoachNotesTextChange={this.props.handleWorkoutCoachNotesTextChange}
          				            plan={this.props.plan}
                              handleAddNewWeekOnClick={this.props.handleAddNewWeekOnClick}
                              loadTrainingPlan={this.props.loadTrainingPlan}
                              createNewTrainingPlan={this.props.createNewTrainingPlan}
                              handleTitleChange={this.props.handleTitleChange}/>
                </div>
          </div>
    	);
  	}
}
export default withRouter(CoachDashboard);