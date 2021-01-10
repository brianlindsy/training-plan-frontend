import React, { useState } from "react";
import {Switch,Route} from "react-router-dom";
import TrainingPlan from './components/scenes/trainingplan.js';
import CoachDashboard from './components/scenes/coachDashboard.js';
import CreateCoach from './components/scenes/createCoach.js';
import NavBarTop from './components/navigation/navbartop.js';
import { httpService } from './httpUtils/httpService.js';
import $ from 'jquery';

const reload = () => window.location.reload();

function App() {
    const [coach, setCoach] = useState({plans:[]});
    const [plan, setPlan] = useState({planUniqueId:null, weeks:[{weeklySummary:{trainingPhase:{}}, days:[]}]});
    const [userSignedIn, setUserSignedIn] = useState(false);
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

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
              setError(true);
          })
    }

    function handleAddNewWeekOnClick(){
      httpService.addWeekToPlan(plan.planUniqueId)
        .then(
            (result) => {
              setPlan(result);
            },
            (error) => {
              setError(true);
          })
    }

    function handleAddNewPlanOnClick(coachId){
      httpService.addPlanToCoach(coach.id)
        .then(
            (result) => {
              setPlan(result);
            },
            (error) => {
              setError(true);
          })
    }

    function loadCoach(coachId){
      httpService.getCoachById(coachId)
        .then(
            (result) => {
              setCoach(result);
            },
            (error) => {
              setError(true);
          })
    }

    function createNewTrainingPlan(){
      httpService.createTrainingPlan()
        .then(
            (result) => {
              setPlan(result);
              window.location.pathname = "/plan/" + result.planUniqueId;
            },
            (error) => {
              setError(true);
          })
    }

    function loadTrainingPlan(planUniqueId){
      httpService.getTrainingPlanByUniqueId(planUniqueId)
        .then(
            (result) => {
              setPlan(result);
            },
            (error) => {
              setError(true);
          })
    }

    function signInOrCreateCoach(tokenId){
      httpService.validateCoach(tokenId.tokenId)
        .then(
            (result) => {
              setCoach(result);
              setUserSignedIn(true);
              window.location.pathname = "/coach/" + coach.id + "/dashboard/plan/" + coach.plans[0].planUniqueId;
            },
            (error) => {
              setError(true);
          })
    }

    
      return (
        <div>
          <Switch>

          <Route path="/createPlan">
              <TrainingPlan loadTrainingPlan={loadTrainingPlan}
                            plan={plan}
                            createNewTrainingPlan={createNewTrainingPlan}
                            handleUserLogTextChange={handleUserLogTextChange}
                            handleWorkoutTextChange={handleWorkoutTextChange}
                            handleWorkoutCoachNotesTextChange={handleWorkoutCoachNotesTextChange}
                            handleAddNewWeekOnClick={handleAddNewWeekOnClick}
                            handleTitleChange={handleTitleChange}
                            handleRunTypeClick={handleRunTypeClick}/>
            </Route>

            {/* Note how these two routes are ordered. The more specific
            path="/contact/:id" comes before path="/contact" so that
            route will render when viewing an individual contact */}
            <Route path="/plan/:planId" render={(match) => (
                <>
                <NavBarTop/>
                <TrainingPlan loadTrainingPlan={loadTrainingPlan}
                            plan={plan}
                            createNewTrainingPlan={createNewTrainingPlan}
                            handleUserLogTextChange={handleUserLogTextChange}
                            handleWorkoutTextChange={handleWorkoutTextChange}
                            handleWorkoutCoachNotesTextChange={handleWorkoutCoachNotesTextChange}
                            handleAddNewWeekOnClick={handleAddNewWeekOnClick}
                            handleTitleChange={handleTitleChange}
                            handleRunTypeClick={handleRunTypeClick}/>
                </>
              )}>
            </Route>

            <Route path="/createCoach">
              <CreateCoach signInOrCreateCoach={signInOrCreateCoach}/>
            </Route>

            <Route path="/coach/:coachId/dashboard/plan/:planId" render={(match) => (
              <CoachDashboard coach={coach}
                              plan={plan}
                              loadCoach={loadCoach}
                              loadTrainingPlan={loadTrainingPlan}
                              handleUserLogTextChange={handleUserLogTextChange}
                              handleWorkoutTextChange={handleWorkoutTextChange}
                              handleWorkoutCoachNotesTextChange={handleWorkoutCoachNotesTextChange}
                              handleAddNewWeekOnClick={handleAddNewWeekOnClick}
                              handleAddNewPlanOnClick={handleAddNewPlanOnClick}
                              handleTitleChange={handleTitleChange}
                              handleRunTypeClick={handleRunTypeClick}/>
            )}>
            </Route>
            <Route path="/landing.html" onEnter={reload} />
      </Switch>
    </div>
  );
} export default App;