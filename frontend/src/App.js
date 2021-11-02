import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* need a the exact keyword since "/" is
          is the most general URL name; i.e. all pages include a "/".*/}
          <Redirect from="/" to="/auth" exact />
          <Route path="/auth" component={AuthPage} />
          <Route path="/events" component={EventsPage} />
          <Route path="/bookings" component={BookingsPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
