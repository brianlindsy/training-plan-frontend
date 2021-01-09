import React from 'react';
import SideBarItem from './sidebarItem.js';
import AddNewTrainingPlanButton from '../buttons/addNewTrainingPlanButton.js';

export default class SideBar extends React.Component {

    render(){
    	const renderedSideBarItems = this.props.plans.map(plan =>
    		<SideBarItem key={plan.id} planUniqueId={plan.planUniqueId} coachId={this.props.coachId} plan={plan}/>
    	);
    	return (
    		<nav className="col-md-2 bg-light c-sidebar">
          <AddNewTrainingPlanButton handleAddNewPlanOnClick={this.props.handleAddNewPlanOnClick}/>
    			<div className="sidebar-sticky">
            <ul className="nav flex-column">
              {renderedSideBarItems}
            </ul>
          </div>
        </nav>
    	);
    }
}