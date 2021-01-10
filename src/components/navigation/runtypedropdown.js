import React from 'react';

export default class RunTypeDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.runTypeOnClick = this.runTypeOnClick.bind(this);
  }

  runTypeOnClick(e){
    this.props.handleRunTypeClick(e.target.textContent, this.props.day);
  }

	render(){
    const renderedOptions = this.props.runTypes.map((runType) => 
        <li class="dropdown-item" key={runType} onClick={this.runTypeOnClick} value={runType}>{runType}</li>
      );
		return (
          <div class="dropdown">
            <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="runTypeDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            </button>
            <ul class="dropdown-menu" id="runTypeDropdownMenu" aria-labelledby="runTypeDropdownMenuButton">
              {renderedOptions}
            </ul>
          </div>
		);
	}
}