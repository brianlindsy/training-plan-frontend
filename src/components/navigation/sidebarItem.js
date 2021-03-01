import React from 'react';


export default class SideBarItem extends React.Component {

    render(){
    	return (
    		<li>
                <a href={"/user/" + this.props.userId + "/dashboard/plan/" + this.props.planUniqueId}>
                  {this.props.plan.title}
                </a>
            </li>
    	);
    }
}