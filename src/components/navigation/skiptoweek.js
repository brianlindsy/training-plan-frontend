import React from 'react';

export default class SkipToWeek extends React.Component {
	render(){
    const renderedOptions = this.props.plan.weeks.map((week, index) => 
        <a className="dropdown-item" key={week.id + "" + index} href={"#Week" + (index + 1)}>{index+1}</a>
      );
		return (
			<div className="form-row">
        <div className="col">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Skip to Week
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {renderedOptions}
            </div>
          </div>
        </div>
      </div>
		);
	}
}