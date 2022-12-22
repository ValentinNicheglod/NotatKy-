import React, { useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';

import Login from './Components/Login';
import ResetPassword from './Components/ResetPassword';
import SignUp from './Components/SignUp';
import Inicio from './Components/Inicio';
import SettingsProfile from './Containers/SettingsProfile';
import SettingsCollections from './Containers/SettingsCollections';
import Home from './Containers/Home';
import NotFound from './Components/NotFound';
import { chargeGuestUser } from './Redux/Actions/Users';

import './index.css';
import './Components/css/SmallScreens.css';

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.users.darkMode);
  const body = document.getElementsByTagName('body')[0];

  useEffect(() => {
    body.setAttribute('id', darkMode ? 'dark' : 'light');
  }, [darkMode, body]);

  setInterval(() => {
    dispatch(chargeGuestUser);
  }, 200000);

  return (
    <div className="App full-height">
      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/edit profile" component={SettingsProfile} />
        <Route
          exact
          path="/collections tags/:type?"
          component={SettingsCollections}
        />
        <Route exact path="/home" component={Home} />
        <Route exact path="/trash" component={Home} />
        <Route exact path="/archive" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
