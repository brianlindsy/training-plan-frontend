import React from 'react';
import SideBarItem from './sidebarItem.js';
import AddNewTrainingPlanButton from './addNewTrainingPlanButton.js';

export default class SideBar extends React.Component {

    render(){
    	const renderedSideBarItems = this.props.plans.map(plan =>
    		<SideBarItem key={plan.id} planUniqueId={plan.planUniqueId} coachId={this.props.coachId} title={plan.title}/>
    	);
    	return (
    		<nav className="col-md-2 d-none d-md-block bg-light sidebar">
    			<div className="sidebar-sticky">
            		<ul className="nav flex-column">
              		{renderedSideBarItems}
            		</ul>
          		</div>
          		<AddNewTrainingPlanButton handleAddNewPlanOnClick={this.props.handleAddNewPlanOnClick}/>
          	</nav>
    	);
    }
}