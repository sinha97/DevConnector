import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './componnents/layout/Navbar';
import Landing from './componnents/layout/Landing';
import Register from './componnents/auth/Register';
import Login from './componnents/auth/Login';
import Alert from './componnents/layout/Alert';
import Dashboard from './componnents/dashboard/Dashboard';
import CreateProfile from './componnents/profile-form/CreateProfile';
import EditProfile from './componnents/profile-form/EditProfile';
import AddExperience from './componnents/profile-form/AddExperience';
import AddEducation from './componnents/profile-form/AddEducation';
import Profiles from './componnents/profiles/Profiles';
import Profile from './componnents/profile/Profile';
import PrivateRoute from './componnents/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path='/add-experience'
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path='/add-education'
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
