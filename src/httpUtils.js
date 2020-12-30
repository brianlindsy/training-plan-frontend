
export default class HttpUtils{

persistDayUpdate(day){
  		const postRequestOptions = {
        	method: 'PUT',
        	body: JSON.stringify(day),
        	headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
    	};
    	console.log("http://localhost:8080/rest/day/" + day.id);
    	console.log(JSON.stringify(day));
  		fetch("http://localhost:8080/rest/day/" + day.id, postRequestOptions)
  	}

createNewTrainingPlan(){
      const postRequestOptions = {
          method: 'POST'
      };
      fetch("http://localhost:8080/rest/plan", postRequestOptions)
      .then(res1 => res1.json())
      .then((createNewPlanResult) => {
        fetch("http://localhost:8080/rest/plan/" + createNewPlanResult.planUniqueId + "/days")
          .then(res2 => res2.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                days: result,
                planUniqueId : createNewPlanResult.planUniqueId
              });
              window.history.pushState('', '', '/' + createNewPlanResult.planUniqueId);
            },
            (error) => {
              console.log(error);
              this.setState({
                isLoaded: true,
                error
              });
          })
        })
    }

getTrainingPlan(planUniqueId){
      fetch("http://localhost:8080/rest/plan/" + planUniqueId + "/days")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                days: result,
                planUniqueId : planUniqueId
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
  }