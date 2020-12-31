import React from 'react';
import Calendar from './calendar.js';
import AddWeekButton from './addWeekButton.js'
import $ from 'jquery';

export default class TrainingPlan extends React.Component {
	constructor(props) {
    	super(props);
      // dont forget that arrays in the plan object need to be set to empty first because the 
      // render step (before componentdidmount where data is retrieved) will see it as a null array
    	this.state = {
    		  error: null,
      		isLoaded: false,
      		plan:{weeks:[{days:[]}]}
    	};

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
              window.history.pushState('', '', '/' + createNewPlanResult.planUniqueId);
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

    getTrainingPlan(planUniqueId){
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

  	componentDidMount() {
      var urlPathPlanUniqueid = window.location.pathname.substring(1);

      if(urlPathPlanUniqueid === ''){
        this.createNewTrainingPlan();
      } else {
        this.getTrainingPlan(urlPathPlanUniqueid);
      }
  	}

  	render() {
    	return (
      		<div className="trainingPlan">
            <div className="alert alert-success alert-dismissable" style={{display: 'none'}} id="success-alert">
              <button type="button" className="close" data-dismiss="alert">x</button>
              <strong>Success! </strong> Your information has been saved.
            </div>
          	<Calendar handleReviewTextChange={this.handleReviewTextChange}
          				handleWorkoutTextChange={this.handleWorkoutTextChange}
          				plan={this.state.plan}/>
            <AddWeekButton handleAddNewWeekOnClick={this.handleAddNewWeekOnClick} />
      		</div>
    	);
  	}
}