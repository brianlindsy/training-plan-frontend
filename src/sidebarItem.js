import React from 'react';

export default class SideBarItem extends React.Component {

    render(){
    	return (
    		<li className="nav-item">
                <a className="nav-link active"
                	href={"/coach/" + this.props.coachId + "/dashboard/plan/" + this.props.planUniqueId}>
                  <span data-feather="home"></span>
                  {this.props.title}
                </a>
            </li>
    	);
    }
}