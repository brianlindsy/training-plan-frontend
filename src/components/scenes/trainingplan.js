import React, { useState, useEffect } from 'react';
import Calendar from '../trainingplan/calendar.js';
import AddWeekButton from '../buttons/addWeekButton.js';
import ChangePlanVisibilityButton from '../buttons/changePlanVisibilityButton.js';
import SkipToWeek from '../navigation/skiptoweek.js';
import {withRouter} from "react-router-dom";
import { httpService } from '../../httpUtils/httpService.js';
import EdiText from 'react-editext';
import $ from 'jquery';

function TrainingPlan(props) {
    const [plan, setPlan] = useState({planUniqueId:null, weeks:[{weeklySummary:{trainingPhase:{}}, days:[]}]});
    const [runTypes, setRunTypes] = useState({runTypes:[]});
    var timeout = 0;

    function showSuccessSavedAlert(){
      $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
        $("#success-alert").slideUp(500);
      });
    }

    function updatePlanWithDay(dayToAdd){
      var currentPlan = plan;
      currentPlan.weeks.forEach(week => {
        week.days.forEach(day => {
          if(day.id === dayToAdd.id){
            day = dayToAdd;
          }
        });
      });
      return currentPlan;
    }

    function createNewTrainingPlan(){
      httpService.createTrainingPlan()
        .then(
            (result) => {
              setPlan(result);
              window.location.pathname = "/plan/" + result.planUniqueId;
            },
            (error) => {
              props.setError(true);
          })
    }

    function loadTrainingPlan(planUniqueId){
      httpService.getTrainingPlanByUniqueId(planUniqueId)
        .then(
            (result) => {
              console.log("Plan"+result);
              setPlan(result);
            },
            (error) => {
              props.setError(true);
          })
    }

    function handleChangePlanVisibilityOnClick(visibility, plan){
      var newPlan = plan;
      newPlan.public = (visibility === "Private" ? "false" : "true")
      persistTrainingPlanUpdate(newPlan);
    }

    function handleRunTypeClick(selectedRunType, day){
      var newDay = day;
      newDay.workout.workoutType.workoutTypeName = selectedRunType;
      var newPlan = updatePlanWithDay(newDay);
      persistTrainingPlanUpdate(newPlan);
    }

    function handleUserLogTextChange(reviewText, day) {
      var newDay = day;
      newDay.workout.userLogEntry = reviewText;
      var newPlan = updatePlanWithDay(newDay);
      persistTrainingPlanUpdate(newPlan);
      showSuccessSavedAlert();
    }
  
    function handleWorkoutTextChange(workoutText, day) {
      var newDay = day;
      newDay.workout.description = workoutText;
      var newPlan = updatePlanWithDay(newDay);
      persistTrainingPlanUpdate(newPlan);
      showSuccessSavedAlert();
    }

    function handleWorkoutCoachNotesTextChange(notesText, day) {
      var newDay = day;
      newDay.workout.workoutType.workoutTypeDescription = notesText;
      var newPlan = updatePlanWithDay(newDay);
      persistTrainingPlanUpdate(newPlan);
      showSuccessSavedAlert();
    }

    function handleTitleChange(titleText, plan){
      var newPlan = plan;
      newPlan.title = titleText;
      persistTrainingPlanUpdate(newPlan);
    }

    function persistTrainingPlanUpdate(plan){
      httpService.updatePlan(plan.planUniqueId, plan)
        .then(
            (result) => {
              setPlan(result);
            },
            (error) => {
              props.setError(true);
          })
    }

    function handleAddNewWeekOnClick(){
      httpService.addWeekToPlan(plan.planUniqueId)
        .then(
            (result) => {
              setPlan(result);
            },
            (error) => {
              props.setError(true);
          })
    }

    function renderVisibilityButton(){
      return props.isSignedIn ? 
                <ChangePlanVisibilityButton handleChangePlanVisibilityOnClick={props.handleChangePlanVisibilityOnClick}
                                         plan={plan}/>
                                      : "";
    }

    useEffect(() => {
      console.log("props: " + props);
      loadTrainingPlan(props.match.params.planId);
      fetch("http://localhost:8080/rest/plan/workoutTypes")
          .then(res => res.json())
          .then(
            (result) => {
              setRunTypes(result);
            },
            (error) => {
              console.log(error);
          })
    }, [props.match.params.planId])

    function handleTitleChange(e) {
      if(timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        handleTitleChange(e, plan);
      }, 1000);
    }

  	
    	return (
      		<div className="col-md-12">
            <div className="alert alert-success alert-dismissable" style={{display: 'none'}} id="success-alert">
              <button type="button" className="close" data-dismiss="alert">x</button>
              <strong>Success! </strong> Your information has been saved.
            </div>
            <div className="row">
              <SkipToWeek plan={plan}/>
              {renderVisibilityButton}
            </div>
            <div className="row justify-content-center">
              <EdiText type='textarea'
                inputProps={{
                  className: 'textarea',
                  style: {
                    outline: 'none',
                    minWidth: 'auto'
                  },
                  rows: 1,
                  cols: 50
                }}
                viewProps= {{
                    style: {'font-size':'22pt'}
                  }}
                value={plan.title}
                onSave={handleTitleChange}/>
            </div>
          	<Calendar handleUserLogTextChange={handleUserLogTextChange}
          				      handleWorkoutTextChange={handleWorkoutTextChange}
                        handleWorkoutCoachNotesTextChange={handleWorkoutCoachNotesTextChange}
          				      plan={plan}
                        runTypes={runTypes}
                        handleAddNewWeekOnClick={handleAddNewWeekOnClick}
                        handleRunTypeClick={handleRunTypeClick}/>
            <AddWeekButton handleAddNewWeekOnClick={handleAddNewWeekOnClick} />
          </div>
    	);
}
export default withRouter(TrainingPlan);