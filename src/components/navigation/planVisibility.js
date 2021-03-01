import React from 'react';

function PlanVisibility(props) {
    return (
      	<span class="navbar-text mr-3">
            This training plan is currently {props.plan.public !== undefined ? (props.plan.public ? "PUBLIC" : "PRIVATE") : ""}
        </span>
    );
} export default PlanVisibility;