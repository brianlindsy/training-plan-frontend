import React, { useState } from 'react';
import NavBarTopLoggedIn from '../navigation/navbarTopLoggedIn.js';
import SideBar from '../navigation/sidebar.js';
import TrainingPlan from './trainingplan.js';
import {withRouter} from "react-router-dom";
import { httpService } from '../../httpUtils/httpService.js';

function UserDashboard(props) {

  function componentDidMount(){
    props.loadUser(props.user.id);
  }

  function handleAddNewPlanOnClick(UserId){
      httpService.addPlanToUser(props.user.id)
        .then(
            (result) => {
              props.setPlan(result);
            },
            (error) => {
              props.setError(true);
          })
      props.loadUser(props.user.id);
    }
    	return (
      		<div className="userDashboard">
                <NavBarTopLoggedIn plan={props.plan} user={props.user}/>
                <div class="d-flex" >
                <SideBar plans={props.user.plans} userId={props.match.params.userId}
                          handleAddNewPlanOnClick={props.handleAddNewPlanOnClick}/>
          	    <TrainingPlan user={props.user}/>
                </div>
          </div>
    	);
}
export default withRouter(UserDashboard);