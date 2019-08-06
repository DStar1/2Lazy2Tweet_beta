import React from 'react';
import axios from 'axios';
// import './Form.css'
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
      <form action="fileupload" enctype="multipart/form-data">
      <DateTimePicker 
                            onChange={this.handleDate.bind(this)}
                            required
                />
        <input onChange={this.handlePost.bind(this)} type="text" name="post" placeholder="Enter post here" required/>
        <input className="btn btn-secondary" onChange={this.handleMediaPath.bind(this)} type="file" name="mediaPath" accept="image/x-png,image/gif,image/jpeg"></input>
   {(this.props.twitter) ? <button className="btn btn-secondary" onClick={this.handleSubmit.bind(this)}>Submit</button> : <div className="btn btn-secondary" >Twitter not connected</div>}
      </form>
      <p>{JSON.stringify(this.state)}</p>
    </div>
   )
    }
}
