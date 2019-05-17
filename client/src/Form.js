import React from 'react';
import axios from 'axios';
import './Form.css'
import { DateTimePicker } from '@progress/kendo-react-dateinputs'
import '@progress/kendo-react-intl'
import '@progress/kendo-react-tooltip'
import '@progress/kendo-react-common'
import '@progress/kendo-react-popup'
import '@progress/kendo-date-math'


export default class FormEnter extends React.Component {
  constructor(props){
    super(props);
    this.state={
      'dateToPost': '',
      'post': ''
    }
  }
  handleDate(e){
    // console.log(e.target.value);
    this.setState({
      dateToPost: e.target.value
    });
  }
  handlePost(e){
    // console.log(e.target.value);
    this.setState({
      post: e.target.value
    });
  }
  handleSubmit(e){
     //call the api here with current state value (this.state.username)
    //  console.log(this.state);
     axios.post("/api/posts", this.state, {
      headers: {
          'accept': 'application/json',
          'accept-language': 'en_US'
      }
    });
  }
  render(){
   return(
     <div>
      <form>
      <DateTimePicker 
                            // name="date"
                            // value={this.state.post}
                            // onChange={e => this.setState({ post: e.target.value })}
                            onChange={this.handleDate.bind(this)}
                />
        {/* <input onChange={this.handleDate.bind(this)} type="text" name="dateToPost" placeholder="Enter date here" /> */}
        <input onChange={this.handlePost.bind(this)} type="text" name="post" placeholder="Enter post here" />
        <button className="btn btn-secondary" onClick={this.handleSubmit.bind(this)}>Submit</button>
      </form>
      <p>{JSON.stringify(this.state)}</p>
    </div>
   )
    }
}
 





// export default class FormEnter extends React.Component {
//     handleSubmit(event) {
//         console.log("YOYOYOOYO");
//         axios.post("/api/posts")
//         .then(res => {
//           const posts = res.data;
//           this.setState({ posts });
//         })
//       }
//     render() {
//       return (
//         <div >
//         <form onSubmit={this.handleSubmit}>
//         <ul className="form-style-1">
//             <li><label>Full Name <span className="required">*</span></label><input type="text" name="field1" className="field-divided" placeholder="First" /> <input type="text" name="field2" className="field-divided" placeholder="Last" /></li>
//             <li>
//                 <label>Subject</label>
//                 <select name="field4" className="field-select">
//                 <option value="Advertise">Advertise</option>
//                 <option value="Partnership">Partnership</option>
//                 <option value="General Question">General</option>
//                 </select>
//             </li>
//             <li>
//                 <label>Your Message <span className="required">*</span></label>
//                 <textarea name="field5" id="field5" className="field-long field-textarea"></textarea>
//             </li>
//             <li>
//                 <input type="submit" value="Submit" />
//             </li>
//         </ul>
//         </form>
//         </div>
//       )
//     }
//   }