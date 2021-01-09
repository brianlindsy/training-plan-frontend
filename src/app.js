import React from "react";
import {Switch,Route} from "react-router-dom";
import TrainingPlan from './components/scenes/trainingplan.js';
import CoachDashboard from './components/scenes/coachDashboard.js';
import CreateCoach from './components/scenes/createCoach.js';
import Home from './components/scenes/home.js';
import NavBarTop from './components/navigation/navbartop.js';
import $ from 'jquery';

export default class App extends React.Component {
	constructor(props) {
    	super(props);
      // dont forget that arrays in the plan object need to be set to empty first because the 
      // render step (before componentdidmount where data is retrieved) will see it as a null array
    	this.state = {
    		  error: null,
      		isLoaded: false,
          userSignedIn: false,
          coach: {plans:[]},
      		plan:{planUniqueId:null, weeks:[{days:[]}]}
    	};

      this.handleRunTypeClick = this.handleRunTypeClick.bind(this);
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.signInOrCreateCoach = this.signInOrCreateCoach.bind(this);
      this.handleAddNewPlanOnClick = this.handleAddNewPlanOnClick.bind(this);
      this.createNewTrainingPlan = this.createNewTrainingPlan.bind(this);
      this.loadCoach = this.loadCoach.bind(this);
      this.loadTrainingPlan = this.loadTrainingPlan.bind(this);
      this.showSuccessSavedAlert = this.showSuccessSavedAlert.bind(this);
      this.handleAddNewWeekOnClick = this.handleAddNewWeekOnClick.bind(this);
    	this.handleUserLogTextChange = this.handleUserLogTextChange.bind(this);
    	this.handleWorkoutCoachNotesTextChange = this.handleWorkoutCoachNotesTextChange.bind(this);
      this.persistTrainingPlanUpdate = this.persistTrainingPlanUpdate.bind(this);
  	}

    showSuccessSavedAlert(){
      $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
        $("#success-alert").slideUp(500);
      });
    }

    updatePlanWithDay(dayToAdd){
      var currentPlan = this.state.plan;
      currentPlan.weeks.forEach(week => {
        week.days.forEach(day => {
          if(day.id === dayToAdd.id){
            day = dayToAdd;
          }
        });
      });
      return currentPlan;
    }

    handleRunTypeClick(selectedRunType, day){
      var newDay = day;
      newDay.workout.workoutType.workoutTypeName = selectedRunType;
      var newPlan = this.updatePlanWithDay(newDay);
      this.persistTrainingPlanUpdate(newPlan);
    }

    handleUserLogTextChange(reviewText, day) {
      var newDay = day;
      newDay.workout.userLogEntry = reviewText;
      var newPlan = this.updatePlanWithDay(newDay);
      this.persistTrainingPlanUpdate(newPlan);
      this.showSuccessSavedAlert();
    }
  
    handleWorkoutTextChange(workoutText, day) {
      var newDay = day;
      newDay.workout.description = workoutText;
      var newPlan = this.updatePlanWithDay(newDay);
      this.persistTrainingPlanUpdate(newPlan);
      this.showSuccessSavedAlert();
    }

    handleWorkoutCoachNotesTextChange(notesText, day) {
      var newDay = day;
      newDay.workout.workoutType.workoutTypeDescription = notesText;
      var newPlan = this.updatePlanWithDay(newDay);
      this.persistTrainingPlanUpdate(newPlan);
      this.showSuccessSavedAlert();
    }

    handleTitleChange(titleText, plan){
      var newPlan = plan;
      newPlan.title = titleText;
      this.persistTrainingPlanUpdate(newPlan);
    }

    persistTrainingPlanUpdate(plan){
      const putRequestOptions = {
          method: 'PUT',
          body: JSON.stringify(plan),
          headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
      };
      console.log("http://localhost:8080/rest/plan/" + plan.planUniqueId);
      fetch("http://localhost:8080/rest/plan/" + plan.planUniqueId, putRequestOptions)
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

    handleAddNewPlanOnClick(){
      const putRequestOptions = {
          method: 'PUT'
      };
      console.log("http://localhost:8080/rest/coach/" + this.state.coach.id + "/addPlan");
      fetch("http://localhost:8080/rest/coach/" + this.state.coach.id + "/addPlan", putRequestOptions)
          .then(res => res.json())
          .then(
            (result) => {
              this.loadCoach(this.state.coach.id);
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

    createCoach(){
      const postRequestOptions = {
          method: 'POST'
      };
      fetch("http://localhost:8080/rest/coach/", postRequestOptions)
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
      .then(
            (result) => {
              this.setState({
                isLoaded: true,
                plan: result
              });
              window.location.pathname = "/plan/" + result.planUniqueId;
            },
            (error) => {
              console.log(error);
              this.setState({
                isLoaded: true,
                error
              });
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

    signInOrCreateCoach(tokenId){
      const postRequestOptions = {
          method: 'POST',
          body: tokenId.tokenId,
          headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
      };
      fetch("http://localhost:8080/rest/coach/validate", postRequestOptions)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                coach: result,
                userSignedIn: true
              });
              window.location.pathname = "/coach/" + this.state.coach.id + "/dashboard/plan/" + this.state.coach.plans[0].planUniqueId;
            },
            (error) => {
              console.log(error);
              this.setState({
                isLoaded: true,
                error
              });
          })
    }

    //manageUserSignIn(tokenId){
    //  this.createOrGetCoach(tokenId.tokenId);
    //  console.log("coach " + JSON.stringify(this.state.coach));
    //  window.location.pathname = "/coach/" + this.state.coach.id + "/dashboard/plan/" + this.state.coach.plans[0].planUniqueId;
    //}

    render(){
      return (
        <div>
          <Switch>

          <Route path="/createPlan">
              <TrainingPlan loadTrainingPlan={this.loadTrainingPlan}
                            plan={this.state.plan}
                            createNewTrainingPlan={this.createNewTrainingPlan}
                            handleUserLogTextChange={this.handleUserLogTextChange}
                            handleWorkoutTextChange={this.handleWorkoutTextChange}
                            handleWorkoutCoachNotesTextChange={this.handleWorkoutCoachNotesTextChange}
                            handleAddNewWeekOnClick={this.handleAddNewWeekOnClick}
                            match={this.props.match}
                            handleTitleChange={this.handleTitleChange}
                            handleRunTypeClick={this.handleRunTypeClick}/>
            </Route>

            {/* Note how these two routes are ordered. The more specific
            path="/contact/:id" comes before path="/contact" so that
            route will render when viewing an individual contact */}
            <Route path="/plan/:planId">
              <NavBarTop/>
              <TrainingPlan loadTrainingPlan={this.loadTrainingPlan}
                            plan={this.state.plan}
                            createNewTrainingPlan={this.createNewTrainingPlan}
                            handleUserLogTextChange={this.handleUserLogTextChange}
                            handleWorkoutTextChange={this.handleWorkoutTextChange}
                            handleWorkoutCoachNotesTextChange={this.handleWorkoutCoachNotesTextChange}
                            handleAddNewWeekOnClick={this.handleAddNewWeekOnClick}
                            match={this.props.match}
                            handleTitleChange={this.handleTitleChange}
                            handleRunTypeClick={this.handleRunTypeClick}/>
            </Route>

            <Route path="/createCoach">
              <CreateCoach signInOrCreateCoach={this.signInOrCreateCoach}/>
            </Route>

            <Route path="/coach/:coachId/dashboard/plan/:planId">
              <CoachDashboard coach={this.state.coach}
                              plan={this.state.plan}
                              loadCoach={this.loadCoach}
                              loadTrainingPlan={this.loadTrainingPlan}
                              handleUserLogTextChange={this.handleUserLogTextChange}
                              handleWorkoutTextChange={this.handleWorkoutTextChange}
                              handleWorkoutCoachNotesTextChange={this.handleWorkoutCoachNotesTextChange}
                              handleAddNewWeekOnClick={this.handleAddNewWeekOnClick}
                              match={this.props.match}
                              handleAddNewPlanOnClick={this.handleAddNewPlanOnClick}
                              handleTitleChange={this.handleTitleChange}
                              handleRunTypeClick={this.handleRunTypeClick}/>
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