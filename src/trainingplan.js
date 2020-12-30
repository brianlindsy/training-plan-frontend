import React from 'react';
import Calendar from './calendar.js';

export default class TrainingPlan extends React.Component {
	constructor(props) {
    	super(props);
      // dont forget that arrays in the plan object need to be set to empty first because the 
      // render step (before componentdidmount where data is retrieved) will see it as a null array
    	this.state = {
    		  error: null,
      		isLoaded: false,
      		plan: { days: [] }
    	};

      this.handleTitleTextChange = this.handleTitleTextChange.bind(this);
    	this.handleReviewTextChange = this.handleReviewTextChange.bind(this);
    	this.handleWorkoutTextChange = this.handleWorkoutTextChange.bind(this);
    	this.updateReview = this.updateReview.bind(this);
    	this.updateWorkout = this.updateWorkout.bind(this);
    	this.persistDayUpdate = this.persistDayUpdate.bind(this);
      this.persistTrainingPlanUpdate = this.persistTrainingPlanUpdate.bind(this);
  	}

    // will need to change this
    handleTitleTextChange(e) {
      if(this.timeout) clearTimeout(this.timeout);
      var newPlan = this.state.plan;
      newPlan.title = e;
      this.timeout = setTimeout(() => {
        this.setState({
          plan: newPlan
        });
        this.persistTrainingPlanUpdate(newPlan);
      }, 500);
    }

  	handleReviewTextChange(reviewText, id) {
  		var daysUpdated = this.updateReview(reviewText, id);
      var newPlan = this.state.plan;
      newPlan.days = daysUpdated;
    	this.setState({
      		plan: newPlan
    	});
  	}
  
  	handleWorkoutTextChange(workoutText, id) {
  		var daysUpdated = this.updateWorkout(workoutText, id);
      var newPlan = this.state.plan;
      newPlan.days = daysUpdated;
    	this.setState({
      		plan: newPlan
    	});
  	}

  	updateWorkout(updatedText, id){
  		return this.state.plan.days.map((day) => {
  			var updated = day;
  			if(day.workout.id === id){
  				updated.workout.description = updatedText;
  				this.persistDayUpdate(day);
  			}
  			return updated;
  		});
  	}

  	updateReview(updatedText, id){
  		return this.state.plan.days.map((day) => {
  			var updated = day;
  			if(day.review.id === id){
  				updated.review.description = updatedText;
  				this.persistDayUpdate(day);
  			}
  			return updated;
  		});
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
              <h5 editable="true" onChange={this.handleTitleTextChange}>{this.state.plan.title}</h5>
          		<Calendar handleReviewTextChange={this.handleReviewTextChange}
          				handleWorkoutTextChange={this.handleWorkoutTextChange}
          				plan={this.state.plan}/>
      		</div>
    	);
  	}
}