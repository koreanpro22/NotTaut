import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import AllWorkspaces from "./components/AllWorkspaces";
import SingleWorkspace from "./components/SingleWorkspace";
// import { ChannelIdProvider } from "./context/ChannelIdProvider";
import PageNotFound from './components/PageNotFound';
import AllChannels from "./components/AllChannels";
import SingleChannel from "./components/SingleChannel";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      {sessionUser ? <>
          <Navigation isLoaded={isLoaded} />
          {isLoaded && (
            <Switch>
              <Route exact path='/'>
                <AllWorkspaces />
              </Route>
              <Route path='/workspace/:workspaceId'>
                <SingleWorkspace />
                <Switch>
                  <Route path='/workspace/:workspaceId/channels'>
                    <AllChannels />
                  </Route>
                  <Route>
                    <SingleChannel />
                  </Route>
                </Switch>
              </Route>
              <Route path="/login" >
                <LoginFormPage />
              </Route>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
              <Route path='*'>
                <PageNotFound />
              </Route>
            </Switch>
          )}
        </> : <>
          <Navigation isLoaded={isLoaded} />
          {isLoaded && (
            <Switch>
              <Route exact path='/'>
                <Homepage />
              </Route>
              <Route>
                <PageNotFound />
              </Route>
            </Switch>
          )}
        </>
      }
    </div>
  );
}

export default App;
