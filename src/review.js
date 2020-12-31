import React from 'react';

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
    }, 500);
  }

	render(){
		return (
			<div className="form-group">
    		<label htmlFor="reviewInput">Review</label>
    		<textarea type="form-control form-text" className="form-control border-0" id="reviewInput"
    					onChange={this.handleReviewTextChange}>{this.props.day.review.description}</textarea>
  			</div>
		);
	}
}