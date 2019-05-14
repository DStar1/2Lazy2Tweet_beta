import React from 'react';
import './App.css';
import FormEnter from './Form.js';
import axios from 'axios';

export default class PostList extends React.Component {
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
    return (
      <div class="elem" id="elem">
        <h1 class="App-header" id="App-header">2Lazy2Tweet</h1>
        <FormEnter />
        { this.state.posts.map(post =>
          <div class="posts" id="posts">
            <h class="dt" id="dt">Date:</h>
            <br></br>
            <h class="dt" id="dt">{post.date}</h>
            <br></br>
            <h class="post" id="post">Post:</h>
            <br></br>
            <p class="post" id="post">{post.post}</p>
          </div>
      )}
      </div>
    )
  }
}

