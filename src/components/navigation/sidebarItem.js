import React from 'react';


export default class SideBarItem extends React.Component {

    render(){
    	return (
    		<li className="c-nav-item">
                <a className="c-nav-link"
                	href={"/coach/" + this.props.coachId + "/dashboard/plan/" + this.props.planUniqueId}>
                  <span data-feather="home"></span>
                  {this.props.plan.title}
                </a>
            </li>
    	);
    }
}