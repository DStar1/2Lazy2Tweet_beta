import React from 'react';
import './Form.css'

export default class FormEnter extends React.Component {
    handleSubmit(event) {
        console.log("YOYOYOOYO");
      }
    render() {
      return (
        <div >
        <form onSubmit={this.handleSubmit}>
        <ul class="form-style-1">
            <li><label>Full Name <span class="required">*</span></label><input type="text" name="field1" class="field-divided" placeholder="First" /> <input type="text" name="field2" class="field-divided" placeholder="Last" /></li>
            <li>
                <label>Subject</label>
                <select name="field4" class="field-select">
                <option value="Advertise">Advertise</option>
                <option value="Partnership">Partnership</option>
                <option value="General Question">General</option>
                </select>
            </li>
            <li>
                <label>Your Message <span class="required">*</span></label>
                <textarea name="field5" id="field5" class="field-long field-textarea"></textarea>
            </li>
            <li>
                <input type="submit" value="Submit" />
            </li>
        </ul>
        </form>
        </div>
      )
    }
  }