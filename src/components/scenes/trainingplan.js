import React from 'react';
import Calendar from '../trainingplan/calendar.js';
import AddWeekButton from '../buttons/addWeekButton.js';
import SkipToWeek from '../navigation/skiptoweek.js';
import {withRouter} from "react-router-dom";
import EdiText from 'react-editext';

class TrainingPlan extends React.Component {
    constructor(props) {
      super(props);
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.timeout = 0;
      this.state = {runTypes:[]}
    }
    
  	componentDidMount() {
      if(this.props.match.params.planId != null){
        this.props.loadTrainingPlan(this.props.match.params.planId);
      } else {
        this.props.createNewTrainingPlan();
      }
      fetch("http://localhost:8080/rest/plan/workoutTypes")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                runTypes: result
              });
            },
            (error) => {
              console.log(error);
              this.setState({
                isLoaded: true,
                error
              });
          })
  	}

    handleTitleChange(e) {
      if(this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.props.handleTitleChange(e, this.props.plan);
      }, 1000);
    }

  	render() {
      console.log("plan: " + JSON.stringify(this.props));
    	return (
      		<div className="col">
            <div className="alert alert-success alert-dismissable" style={{display: 'none'}} id="success-alert">
              <button type="button" className="close" data-dismiss="alert">x</button>
              <strong>Success! </strong> Your information has been saved.
            </div>
            <SkipToWeek plan={this.props.plan}/>
            <div className="row justify-content-center">
              <EdiText type='textarea'
                inputProps={{
                  className: 'textarea',
                  style: {
                    outline: 'none',
                    minWidth: 'auto'
                  },
                  rows: 1,
                  cols: 50
                }}
                viewProps= {{
                    style: {'font-size':'22pt'}
                  }}
                value={this.props.plan.title}
                onSave={this.handleTitleChange}/>
            </div>
          	<Calendar handleUserLogTextChange={this.props.handleUserLogTextChange}
          				      handleWorkoutTextChange={this.props.handleWorkoutTextChange}
                        handleWorkoutCoachNotesTextChange={this.props.handleWorkoutCoachNotesTextChange}
          				      plan={this.props.plan}
                        runTypes={this.state.runTypes}
                        handleAddNewWeekOnClick={this.props.handleAddNewWeekOnClick}
                        handleRunTypeClick={this.props.handleRunTypeClick}/>
            <AddWeekButton handleAddNewWeekOnClick={this.props.handleAddNewWeekOnClick} />
          </div>
    	);
  	}
}
export default withRouter(TrainingPlan);