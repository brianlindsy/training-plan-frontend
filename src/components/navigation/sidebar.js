import React from 'react';
import SideBarItem from './sidebarItem.js';
import AddNewTrainingPlanButton from '../buttons/addNewTrainingPlanButton.js';
import './sidebar.css';

export default class SideBar extends React.Component {

    render(){
    	const renderedSideBarItems = this.props.plans.map(plan =>
    		<SideBarItem key={plan.id} planUniqueId={plan.planUniqueId} userId={this.props.userId} plan={plan}/>
    	);
    	return (
            <div class="wrapper">
    		  <nav id="sidebar">
              <div class="sidebar-header">
                    <h3>Training Plans</h3>
              </div>
                <AddNewTrainingPlanButton handleAddNewPlanOnClick={this.props.handleAddNewPlanOnClick}/>
    			<ul class="list-unstyled components">
                  {renderedSideBarItems}
                </ul>
              </nav>
            </div>
    	);
    }
}