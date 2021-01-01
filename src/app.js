import React from "react";
import {Switch,Route} from "react-router-dom";
import TrainingPlan from './trainingplan.js';
import CoachDashboard from './coachDashboard.js';
import Home from './home.js';
import $ from 'jquery';

export default class App extends React.Component {
	constructor(props) {
    	super(props);
      // dont forget that arrays in the plan object need to be set to empty first because the 
      // render step (before componentdidmount where data is retrieved) will see it as a null array
    	this.state = {
    		  error: null,
      		isLoaded: false,
          coach: {plans:[]},
      		plan:{weeks:[{days:[]}]}
    	};

      this.loadCoach = this.loadCoach.bind(this);
      this.loadTrainingPlan = this.loadTrainingPlan.bind(this);
      this.showSuccessSavedAlert = this.showSuccessSavedAlert.bind(this);
      this.handleAddNewWeekOnClick = this.handleAddNewWeekOnClick.bind(this);
    	this.handleReviewTextChange = this.handleReviewTextChange.bind(this);
    	this.handleWorkoutTextChange = this.handleWorkoutTextChange.bind(this);
    	this.persistDayUpdate = this.persistDayUpdate.bind(this);
      this.persistTrainingPlanUpdate = this.persistTrainingPlanUpdate.bind(this);
  	}

    showSuccessSavedAlert(){
      $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
        $("#success-alert").slideUp(500);
      });
    }

    handleReviewTextChange(reviewText, day) {
      var newDay = day;
      newDay.review.description = reviewText;
      this.persistDayUpdate(newDay);
      this.showSuccessSavedAlert();
    }
  
    handleWorkoutTextChange(workoutText, day) {
      var newDay = day;
      newDay.workout.description = workoutText;
      this.persistDayUpdate(newDay);
      this.showSuccessSavedAlert();
    }

    persistTrainingPlanUpdate(plan){
      const postRequestOptions = {
          method: 'PUT',
          body: JSON.stringify(plan),
          headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
      };
      console.log("http://localhost:8080/rest/plan/" + plan.planUniqueId);
      console.log(JSON.stringify(plan));
      fetch("http://localhost:8080/rest/day/" + plan.planUniqueId, postRequestOptions)
    }

    persistDayUpdate(day){
      const postRequestOptions = {
          method: 'PUT',
          body: JSON.stringify(day),
          headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
      };
      console.log("http://localhost:8080/rest/day/" + day.id);
      console.log(JSON.stringify(day));
      fetch("http://localhost:8080/rest/day/" + day.id, postRequestOptions)
    }

    handleAddNewWeekOnClick(){
      const putRequestOptions = {
          method: 'PUT'
      };
      fetch("http://localhost:8080/rest/plan/" + this.state.plan.planUniqueId + "/addWeek", putRequestOptions)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                plan: result
              });
            },
            (error) => {
              console.log(error);
              this.setState({
                isLoaded: true,
                error
              });
          })
    }

    loadCoach(coachId){
      fetch("http://localhost:8080/rest/coach/" + coachId)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                coach: result
              });
            },
            (error) => {
              console.log(error);
              this.setState({
                isLoaded: true,
                error
              });
          })
    }

    createNewTrainingPlan(){
      const postRequestOptions = {
          method: 'POST'
      };
      fetch("http://localhost:8080/rest/plan", postRequestOptions)
      .then(res1 => res1.json())
      .then((createNewPlanResult) => {
        fetch("http://localhost:8080/rest/plan/" + createNewPlanResult.planUniqueId)
          .then(res2 => res2.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                plan: result
              });
            },
            (error) => {
              console.log(error);
              this.setState({
                isLoaded: true,
                error
              });
          })
        })
    }

    loadTrainingPlan(planUniqueId){
      fetch("http://localhost:8080/rest/plan/" + planUniqueId)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                plan: result
              });
            },
            (error) => {
              console.log(error);
              this.setState({
                isLoaded: true,
                error
              });
          })
    }

    render(){
      return (
        <div>
          <Switch>

            {/* Note how these two routes are ordered. The more specific
            path="/contact/:id" comes before path="/contact" so that
            route will render when viewing an individual contact */}
            <Route path="/plan/:planId">
              <TrainingPlan loadTrainingPlan={this.loadTrainingPlan}
                            plan={this.state.plan}
                            handleReviewTextChange={this.handleReviewTextChange}
                            handleWorkoutTextChange={this.handleWorkoutTextChange}
                            handleAddNewWeekOnClick={this.handleAddNewWeekOnClick}
                            match={this.props.match}/>
            </Route>

            <Route path="/coach/:coachId/dashboard/plan/:planId">
              <CoachDashboard coach={this.state.coach}
                              plan={this.state.plan}
                              loadCoach={this.loadCoach}
                              loadTrainingPlan={this.loadTrainingPlan}
                              handleReviewTextChange={this.handleReviewTextChange}
                              handleWorkoutTextChange={this.handleWorkoutTextChange}
                              handleAddNewWeekOnClick={this.handleAddNewWeekOnClick}
                              match={this.props.match}/>
            </Route>

            {/* If none of the previous routes render anything,
            this route acts as a fallback.

            Important: A route with path="/" will *always* match
            the URL because all URLs begin with a /. So that's
            why we put this one last of all */}
            <Route path="/">
              <Home />
            </Route>
      </Switch>
    </div>
  );
    }
}