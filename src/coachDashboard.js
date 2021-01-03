import React from 'react';
import Calendar from './calendar.js';
import NavBarTop from './navbartop.js';
import SideBar from './sidebar.js';
import {withRouter} from "react-router-dom";

class CoachDashboard extends React.Component {

  componentDidMount(){
    const coachId = this.props.match.params.coachId;
    const planId = this.props.match.params.planId;
    this.props.loadCoach(coachId);
    this.props.loadTrainingPlan(planId);
  }

  	render() {
      console.log("coach: " + JSON.stringify(this.props.coach));
    	return (
      		<div className="coachDashboard">
            <NavBarTop coach={this.props.coach}/>
            <div className="alert alert-success alert-dismissable" style={{display: 'none'}} id="success-alert">
              <button type="button" className="close" data-dismiss="alert">x</button>
              <strong>Success! </strong> Your information has been saved.
            </div>
            <div className="container-fluid">
              <div className="row">
                <SideBar plans={this.props.coach.plans} coachId={this.props.match.params.coachId}
                          handleAddNewPlanOnClick={this.props.handleAddNewPlanOnClick}/>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          	        <Calendar handleReviewTextChange={this.props.handleReviewTextChange}
          				            handleWorkoutTextChange={this.props.handleWorkoutTextChange}
          				            plan={this.props.plan}
                              handleAddNewWeekOnClick={this.props.handleAddNewWeekOnClick}/>
                  </div>
                </main>
              </div>
      		  </div>
          </div>
    	);
  	}
}
export default withRouter(CoachDashboard);