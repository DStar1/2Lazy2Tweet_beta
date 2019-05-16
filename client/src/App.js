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
    posts: [],
    user: 'undefined'
  }

  componentDidMount() {
      axios.get("/auth")
      .then(res => {
        const user = res.data;
        console.dir(user);
        this.setState({ user });
        axios.get("/api/posts")
          .then(res => {
            const posts = res.data;
            this.setState({ posts });
        });
      });
  }

  render() {
    const user = (
      <div>
        <p>{this.state.user.name}'s Post Queue</p>
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
      <br></br>
      <a href="http://localhost:8080/users/logout" classNmae="btn btn-secondary">Logout</a>
      </div>
    );

    const guest = (
      <ul className="nav navbar-nav navbar-right">
        <a href="http://localhost:8080" classNmae="btn btn-secondary">Login</a>
      </ul>
    );
    
    // //////// FUCK SESSIONS /////////
    // if (this.state.user === 'undefined') return(
    //   <a href="http://localhost:8080" classNmae="btn btn-secondary">Login</a>
    // );
    // else {
    return (
      <div className="elem" id="elem">
        <h1 className="App-header" id="App-header">2Lazy2Tweet</h1>
        <FormEnter/>
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