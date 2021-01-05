import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './trainingplan.css';

export default class Review extends React.Component {
	constructor(props) {
    super(props);
    this.handleReviewTextChange = this.handleReviewTextChange.bind(this);
    this.timeout = 0;
  }
  
  handleReviewTextChange(e) {
  	if(this.timeout) clearTimeout(this.timeout);
  	this.timeout = setTimeout(() => {
    	this.props.handleReviewTextChange(e.target.value, this.props.day);
    }, 1000);
  }

	render(){
		return (
			<div className="form-group">
        <label htmlFor="reviewInput">Comments</label>
        <textarea rows="5" type="text" class="form-control border-0"
               onChange={this.handleReviewTextChange}>
               {this.props.day.review.description}
        </textarea>
  		</div>
		);
	}
}