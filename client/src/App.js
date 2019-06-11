import React from 'react';
import './App.css';
import FormEnter from './Form.js';
import axios from 'axios';
import Cookies from 'js-cookie';
// import Auth from './modules/auth';
// import { connect } from 'react-redux';

// const NoMatch = () => (
//   <p>Path not found</p>
// );

class PostList extends React.Component {
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
          this.setState({ loggedInTwitter: (user.twitter) ? <div className="twitterGreen">{user.twitter} Twitter Connected</div> : <a href="http://localhost:5000/twitter/login" classNmae="twitterNot">Connect Twitter</a>});
          this.setState({ twitter: (user.twitter) ? 1 : 0 });
          console.dir(user);
          console.log("Connected to the didMount funct where you tell it twitter");
          axios.get("/api/posts")
            .then(res => {
              const posts = res.data;
              this.setState({ posts });
              console.dir(posts);
          });
        }
  }
  // notLoggedInTwitter = <a href="http://localhost:5000/twitter/login" classNmae="btn btn-secondary">Connect Twitter</a>;
  
  render() {
    const user = (
      <div>
        <FormEnter twitter={this.state.twitter}/>
        {this.state.loggedInTwitter}
        {/* <br></br> */}
        {/* <p>{this.state.user.name}'s Post Queue</p> */}
          { this.state.posts.map(post =>
            <div>
              <div className="posts" id="posts">
                <h className="dt" id="dt">Twitter: {post.twitter}</h>
                <br></br>
                <h className="dt" id="dt">Date: {post.dateToPost}</h>
                {/* <br></br>
                <h className="dt" id="dt">{post.dateToPost}</h> */}
                <br></br>
                <h className="post" id="post">Post:</h>
                <br></br>
                <p className="post" id="post">{post.post}</p>
              </div>
              <div className="break" id="break"></div>
            </div>
      )}
      <br></br>
      <a href="http://localhost:5000/users/logout" className="btn btn-secondary">Logout</a>
      </div>
    );

    const guest = (
      <div>
      <FormEnter twitter={0}/>
      <ul className="nav navbar-nav navbar-right">
        <a href="http://localhost:5000" className="btn btn-secondary">Login</a>
      </ul>
      </div>
    );
    
    // //////// FUCK SESSIONS /////////
    // if (this.state.user === 'undefined') return(
    //   <a href="http://localhost:5000" classNmae="btn btn-secondary">Login</a>
    // );
    // else {
    return (
      <div className="elem" id="elem">
        <h1 className="App-header" id="App-header">2Lazy2Tweet</h1>
        {(this.state.user === 'undefined') ? guest : user}
      </div>
    )
  }
}
// }
// }
// function mapStateToProps(state) {
//   return {
//     auth: state.auth
//   };
// }

export default PostList;//connect(mapStateToProps)(PostList);