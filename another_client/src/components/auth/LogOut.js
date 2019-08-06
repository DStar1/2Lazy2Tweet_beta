import React, { Component } from 'react'
import axios from 'axios';

class LogOut extends Component {
    componentDidMount() {
      axios.get("/users/logout")////????
        .then(res => {
          console.log("Logging out");
      });
    }
    render() {
    return (
      <div className="container">
          <p>Logged out!</p>
      </div>
    )
  }
}

export default LogOut
