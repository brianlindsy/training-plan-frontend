import React, { useState } from "react";
import {Switch,Route} from "react-router-dom";
import TrainingPlan from './components/scenes/trainingplan.js';
import UserDashboard from './components/scenes/userDashboard.js';
import NavBarTopNotLoggedIn from './components/navigation/navbarTopNotLoggedIn.js';
import { httpService } from './httpUtils/httpService.js';
import PlanAccessError from './components/errors/planAccessError.js';

const reload = () => window.location.reload();

function App(props) {
    const [user, setUser] = useState({plans:[]});
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [error, setError] = useState(false);

    function loadUser(UserId){
      httpService.getUserById(UserId)
        .then(
            (result) => {
              setUser(result);
            },
            (error) => {
              setError(true);
          })
    }

    function signInOrCreateUser(tokenId){
      httpService.validateUser(tokenId.tokenId)
        .then(
            (result) => {
              setUser(result);
              setIsSignedIn(true);
              window.location.pathname = "/dashboard";
              
            },
            (error) => {
              setError(true);
          })
    }

    function handleLogout(){
      setIsSignedIn(false);
    }
    
      return (
        <div>
          <Switch>
            {/* Note how these two routes are ordered. The more specific
            path="/contact/:id" comes before path="/contact" so that
            route will render when viewing an individual contact */}
            <Route path="/plan/:planId" render={(match) => (
                <>
                <NavBarTopNotLoggedIn signInOrCreateUser={signInOrCreateUser}/>
                  <TrainingPlan isSignedIn={isSignedIn}/>
                </>
              )}>
            </Route>

            <Route path="/dashboard" render={(match) => (
              <UserDashboard user={user}
                              isSignedIn={isSignedIn}
                              loadUser={loadUser}/>
            )}>
            </Route>
            <Route path="/landing.html" onEnter={reload} />
      </Switch>
    </div>
  );
} export default App;