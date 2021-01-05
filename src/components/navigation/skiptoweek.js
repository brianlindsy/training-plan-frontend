import React from 'react';

export default class SkipToWeek extends React.Component {
	render(){
    const renderedOptions = this.props.plan.weeks.map((week, index) => 
        <a class="dropdown-item" href={"#Week" + (index + 1)}>{index+1}</a>
      );
		return (
			<div class="form-row">
        <div class="col">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Skip to Week
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {renderedOptions}
            </div>
          </div>
        </div>
      </div>
		);
	}
}