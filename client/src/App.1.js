// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { Component } from 'react';

import { Calendar, CalendarCell, CalendarWeekCell, CalendarNavigationItem, CalendarHeaderTitle, DateInput, DatePicker, TimePicker, MultiViewCalendar, DateRangePicker, DateTimePicker } from '@progress/kendo-react-dateinputs'
import '@progress/kendo-react-intl'
import '@progress/kendo-react-tooltip'
import '@progress/kendo-react-common'
import '@progress/kendo-react-popup'
import '@progress/kendo-date-math'

import logo from './logo.svg';
import './App.css';

/////
class EventLog extends React.Component {
  renderLogs = () => this.props.logs.map((log, index) =>
      (<li key={index}>{log}</li>)
  );
  render() {
      return (
          <div className="example-config">
              <h5>{this.props.title}</h5>
              <ul className="event-log" style={{ maxHeight: '300px' }}>
                  {this.renderLogs()}
              </ul>
          </div>
      );
  }
}
////




class App extends Component {
  logs = [];
  constructor(props) {
      super(props);

      this.state = {
          value: new Date(),
          events: this.logs
      };
  }
  handleChange = (event) => {
      this.logs.unshift("change: " + event.target.value);

      this.setState({
          value: event.target.value,
          events: this.logs.slice()
      });
  }



  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/dictionary-api');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/dictionary-api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };
render() {


if (1) {
    return (
      <div className="App">

      <h1>2Lazy2Tweet</h1>
      <dl></dl>
      <strong>Tweet Queue Empty</strong>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <p>{this.state.response}</p>
        <p>{'Hello'}</p>
        {/* <div className="example-wrapper" >
                <p>(use Alt+<code>↓</code> to open the date-time selector, <code>←</code> and <code>→</code> to navigate, <code>↑</code> to increment and <code>↓</code> to decrement the value)</p>
                <DateTimePicker />
            </div> */}

          {/* <div className="row">
                <div className="col-md-6">
                    <DateTimePicker
                        onChange={this.handleChange}
                        value={this.state.value}
                    />
                </div>
                <div className="col-md-6">
                    <EventLog logs={this.state.events} title={"DateTimePicker Events"} />
                </div>
            </div> */}

      {/* <form>
      <input type="Text" name="post" id="post" placeholder="new post..." required />
      <div className="example-wrapper" type='text' class="form-control" id="date" name="date" placeholder="new date..." required >
                <DateTimePicker />
            </div>
              
              <button>Schedule Post</button>
          </form> */}


        <form onSubmit={this.handleSubmit}>
          <p>
            {/* <strong>Post to Server:</strong> */}
          </p>
          <div>
          <div className="example-wrapper" >
                <DateTimePicker 
                            // name="date"
                            // value={this.state.post}
                            // onChange={e => this.setState({ post: e.target.value })}
                />
            </div>
          <input
            name="post" id="post" placeholder="new post..." required 
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Schedule Post</button>
          </div>
        </form>
        <a href="http://localhost:8080/users/logout" >Logout</a>
        <p>{this.state.responseToPost}</p>
      </div>
    );
        } else {
          return (
            <a href="http://localhost:8080" >Login</a>
          );
        }



  }
}
export default App;



// // export default App;
// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// class App extends Component {
//   state = {
//     response: '',
//     post: '',
//     responseToPost: '',
//   };
//   componentDidMount() {
//     this.callApi()
//       .then(res => this.setState({ response: res.express }))
//       .catch(err => console.log(err));
//   }
//   callApi = async () => {
//     const response = await fetch('/dictionary-api');
//     const body = await response.json();
//     if (response.status !== 200) throw Error(body.message);
//     return body;
//   };
//   handleSubmit = async e => {
//     e.preventDefault();
//     const response = await fetch('/dictionary-api', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ post: this.state.post }),
//     });
//     const body = await response.text();
//     this.setState({ responseToPost: body });
//   };
// render() {
//     return (
//       <div>
//         <h1>2Lazy2Tweet</h1>
//         <dl></dl>
//         <p>Tweet Queue Empty</p>
    
//         <form>
    
//             <div class='input-group date' id='datetimepicker1'>
//                 <input type='text' class="form-control" id="date" name="date" placeholder="new date..." required />
//                 <span class="input-group-addon">
//                     <span class="glyphicon glyphicon-calendar"></span>
//                 </span>
//             </div>
//             <input type="Text" name="post" id="post" placeholder="new post..." required />
//             <button>Schedule Post</button>
//         </form>
//         </div>
//     );
//   }
// }
// export default App;