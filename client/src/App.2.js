import React, { Component } from 'react';
// import Register from './email.js';
import './App.css';

export default class App extends Component {

	constructor (props)
	{
		super(props)
		this.state = {
			users: []
		};
		this.preconditionFetch()


	}
	state = {users: []}
	status(response) {
		if (response.status >= 200 && response.status < 300){
			return Promise.resolve(response)
		} else {
			return Promise.reject(new Error(response.statusText))
		}
	};
	json(response) {
		return response.json()
	};

	preconditionFetch = async () => this.setState({ users: await (await fetch('api/posts')).json()});

	// async preconditionFetch() {

	// 	const response = await fetch('/users');
	// 	const users = await response.json();
	// 	// if everything ok convert to json

	// 	this.setState({ users });
	// }

	          // {user.id}>
	render() {
		return (
			<div className="App">
        <h1>Uses</h1>
        {this.state.users.map(user =>
          <div>
              <h>{user.date}</h>
              <h>{user.date}</h>
          </div>
		)}
      </div>
    );
}
};