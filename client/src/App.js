import React from 'react';
import './App.css';
import FormEnter from './Form.js';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignIn from './Login'
import Dashboard from './PostList'
// import Auth from './modules/auth';
// import { connect } from 'react-redux';

// const NoMatch = () => (
//   <p>Path not found</p>
// );

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/signin' component={SignIn} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}


export default App;//connect(mapStateToProps)(PostList);