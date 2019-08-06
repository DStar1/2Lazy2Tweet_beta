import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import Notifications from './Notifications'
import FormEnter from '../layout/Form.js';
import axios from 'axios';
import Cookies from 'js-cookie';

class Dashboard extends Component {

  state = {
    posts: [],
    user: 'undefined',
    loggedInTwitter: 0,
    twitter: 0
  }

  // loggedInTwitter = <a href="http://localhost:5000/twitter/login" classNmae="twitterNot">Connect Twitter</a>;
  // connected = <div className="twitterGreen">Twitter Connected</div>;
  componentDidMount() {

        const user = Cookies.get('user');
        console.dir(user);
        if (typeof(user) !== 'undefined') {
          this.setState({ user });
          // this.setState({ loggedInTwitter: (user.twitter) ? <div className="twitterGreen">{user.twitter} Twitter Connected</div> : <a href="https://still-refuge-69608.herokuapp.com/twitter/login" className="twitterNot">Connect Twitter</a>});
          this.setState({ loggedInTwitter: (user.twitter) ? <div className="twitterGreen">{user.twitter} Twitter Connected</div> : <a href="http://localhost:5000/twitter/login" className="twitterNot">Connect Twitter</a>});
          this.setState({ twitter: (user.twitter) ? 1 : 0 });
          console.dir(user);
          console.log("Connected to the didMount funct where you tell it twitter");
          axios.get("/api/posts")
            .then(res => {
              let posts = typeof(res) !== 'undefined' ? res.data : [];
              if (Array.isArray(posts)) {
                this.setState({ posts });
                console.log("Retrieving posts");
                console.dir(posts);
              }
          });
        }
  }

  render() {
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m5">
            <br></br>
             {this.state.loggedInTwitter}
            <FormEnter twitter={this.state.twitter}/>
          </div>
          <div className="col s12 m6">
            <ProjectList projects={this.state.posts} />
          </div>
          {/* <div className="col s12 m5 offset-m1">
            <Notifications />
          </div> */}
        </div>
      </div>
    )
  }
}

export default Dashboard
