import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";

import { Snackbar } from '@material-ui/core';
import { Provider } from "react-redux";
import { store } from "Redux@Helpers";
import Signin from './views/signin';
import Signup from './views/signup';
import {AuthProvider} from './Auth';
import Home from './views/home';
import Project from './views/project';
import Members from './views/members';
import Auth from './views/auth';
import UpdateObject from './views/updateobject';
import { actions } from './redux/_actions';

function AppContainer() {
  const { error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Signin} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/home" exact component={Home} />
          <Route path="/project/:id" exact component={Project} />
          <Route path="/members/:projectId" exact component={Members} />
          <Route path="/updateobject/:projectId/:id" exact component={UpdateObject} />
        </Switch>
      </Router>
      <Snackbar open={!!error} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={() =>  dispatch(actions.setError(''))}>
        <div className="error-msg">{error}</div>
      </Snackbar>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}