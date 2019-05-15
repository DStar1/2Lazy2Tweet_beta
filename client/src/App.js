import React from 'react';
import './App.css';
import FormEnter from './Form.js';
import axios from 'axios';
import Auth from './modules/auth';
// import { connect } from 'react-redux';

// const NoMatch = () => (
//   <p>Path not found</p>
// );

class PostList extends React.Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get("/api/posts")
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      })
  }

  render() {
    // const { isAuthenticated } = this.props.auth;

    // const userLinks = (
    //   <ul className="nav navbar-nav navbar-right">
    //     <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
    //   </ul>
    // );

    // const guestLinks = (
    //   <ul className="nav navbar-nav navbar-right">
    //     <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
    //   </ul>
    // );
    
    //////// FUCK SESSIONS /////////
    if (Auth.isUserAuthenticated()) return("Login");
    else {
    return (
      <div className="elem" id="elem">
        <h1 className="App-header" id="App-header">2Lazy2Tweet</h1>
        <FormEnter />
        { this.state.posts.map(post =>
            <div>
              <div className="posts" id="posts">
                <h className="dt" id="dt">Date:</h>
                <br></br>
                <h className="dt" id="dt">{post.dateToPost}</h>
                <br></br>
                <h className="post" id="post">Post:</h>
                <br></br>
                <p className="post" id="post">{post.post}</p>
              </div>
              <div className="break" id="break"></div>
            </div>
      )}
      <a href="http://localhost:8080/users/logout" classNmae="btn btn-secondary">Logout</a>
      <br></br>
      {document.getElementById("sid")}
      </div>
    )
  }
}
}
// }
// function mapStateToProps(state) {
//   return {
//     auth: state.auth
//   };
// }

export default PostList;//connect(mapStateToProps)(PostList);