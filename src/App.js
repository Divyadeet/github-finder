import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import './App.css';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';


const App = (props) => {

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert />
            <Switch>
              <Route exact path='/' component={Home}>
              </Route>
              <Route exact path='/about' component={About} ></Route>
              <Route exact path='/user/:login' component={User}></Route>
              <Route component={NotFound} ></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
}

export default App;
