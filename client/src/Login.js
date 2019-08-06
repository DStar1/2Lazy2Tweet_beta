import React from 'react';
// import './Login.css';
import FormEnter from './Form.js';
import axios from 'axios';
import Cookies from 'js-cookie';
// import Auth from './modules/auth';
// import { connect } from 'react-redux';

// const NoMatch = () => (
//   <p>Path not found</p>
// );

export default class SignIn extends React.Component {
  state = {
    name: '',
    email: '',
    password: ''
  }

  // loggedInTwitter = <a href="http://localhost:5000/twitter/login" classNmae="twitterNot">Connect Twitter</a>;
  // connected = <div className="twitterGreen">Twitter Connected</div>;
  componentDidMount() {

        const user = Cookies.get('user');
  }
  // notLoggedInTwitter = <a href="http://localhost:5000/twitter/login" classNmae="btn btn-secondary">Connect Twitter</a>;
  
  handleEmail(e){
    // console.log(e.target.value);
    this.setState({
      email: e.target.value
    });
  }
  
  handlePassword(e){
    // console.log(e.target.value);
    this.setState({
      password: e.target.value
    });
  }
  
  handleSubmit(e){
    e.preventDefault();
     axios.post("/api/posts", this.state, {
      headers: {
          'accept': 'application/json',
          'accept-language': 'en_US'
      }
    });
  }

  render() {
    return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                  <h5 className="grey-text text-darken-3">Sign In</h5>
                  <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={this.handleEmail}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={this.handlePassword}
                    />
                  </div>
                  <div className="input-field">
                      <button className="btn grey lighten-1 z-depth-0">Login</button>
                  </div>
                </form>
              </div>
    );
  }
}