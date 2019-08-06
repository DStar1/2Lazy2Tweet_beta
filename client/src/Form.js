import React from 'react';
import axios from 'axios';
import './Form.css'
import { DateTimePicker } from '@progress/kendo-react-dateinputs'
import '@progress/kendo-react-intl'
import '@progress/kendo-react-tooltip'
import '@progress/kendo-react-common'
import '@progress/kendo-react-popup'
import '@progress/kendo-date-math'
// import { ENGINE_METHOD_NONE } from 'constants';


export default class FormEnter extends React.Component {
  constructor(props){
    super(props);
    this.state={
      dateToPost: '',
      post: '',
      media: null,
      loggedInTwitter: 0
    }
  }
  componentDidMount() {
    this.setState({ loggedInTwitter: this.props.twitter});
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
  handleMediaPath(e){
    // console.log(e.target.value);
    this.setState({
      media: e.target.files[0]//value
    });
  }
  
  handleSubmit(e){
    // let bodyFormData = new FormData();
    // bodyFormData.append(this.state);
    // // bodyFormData.append('image', fs.createReadStream(pathToFile));
    
    //  //call the api here with current state value (this.state.username)
    // //  console.log(this.state);
    //  axios.post("/api/posts", bodyFormData, {
    //   headers: {
    //       'accept': 'application/json',
    //       'accept-language': 'en_US'
    //   }
    // });
     axios.post("/api/posts", this.state, {
      headers: {
          'accept': 'application/json',
          'accept-language': 'en_US'
      }
    });
  }
  render(){
  // console.log("TRYING TO GET TWITTER TO PASS OBJECT!!!");
  // console.dir(this.props.twitter);
  // console.log(this.state.loggedInTwitter);
   return(
     <div>
      <form action="fileupload" enctype="multipart/form-data">
      <DateTimePicker 
                            // name="date"
                            // value={this.state.post}
                            // onChange={e => this.setState({ post: e.target.value })}
                            onChange={this.handleDate.bind(this)}
                            required
                />
        {/* <input onChange={this.handleDate.bind(this)} type="text" name="dateToPost" placeholder="Enter date here" /> */}
        <input onChange={this.handlePost.bind(this)} type="text" name="post" placeholder="Enter post here" required/>
        <input className="btn btn-secondary" onChange={this.handleMediaPath.bind(this)} type="file" name="mediaPath" accept="image/x-png,image/gif,image/jpeg"></input>
   {/* {(typeof this.props.twitter !== 'undefined') ? <button className="btn btn-secondary" onClick={this.handleSubmit.bind(this)}>Submit</button> : <div className="btn btn-secondary" >Log in to twitter</div>} */}
   {/* <button className="btn btn-secondary" onClick={this.handleSubmit.bind(this)}>Submit</button> */}
   {/* {(this.state.twitter) ? <button className="btn btn-secondary" onClick={this.handleSubmit.bind(this)}>Submit</button> : <div className="btn btn-secondary" >Log in to twitter</div>} */}
   {(this.props.twitter) ? <button className="btn btn-secondary" onClick={this.handleSubmit.bind(this)}>Submit</button> : <div className="btn btn-secondary" >Twitter not connected</div>}
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