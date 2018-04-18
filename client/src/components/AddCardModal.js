import axios from 'axios';
import React, { Component } from 'react';
// import AddJobForm from './AddJobForm';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {red500, red400, pink500, pink400, purple500, purple400, deepPurple500, deepPurple400, blue500, blue400, orange500, orange400, cyan500, cyan400, teal500, teal400, lightBlue500, lightBlue400, amber500, amber400, deepOrange500, deepOrange400, indigo500, indigo400, green500, green400, blueGrey500, blueGrey400} from 'material-ui/styles/colors';
import './style.css'
// import API from '../utils/API';

class AddCardModal extends Component {
  state = {
    companyName: "",
    jobTitle: "",
    open: false,
    colorArray: [
      {red500, red400},{pink500, pink400},{purple500, purple400},{deepPurple500, deepPurple400},{blue500, blue400},{orange500, orange400},{cyan500, cyan400},{teal500, teal400}, {lightBlue500, lightBlue400},{amber500, amber400}, {deepOrange500, deepOrange400}, {indigo500, indigo400}, {green500, green400}, {blueGrey500, blueGrey400}
    ]
  }


  handleOpen = () => {
    this.setState({open: true});
    let randomColor = this.state.colorArray[Math.floor(Math.random() * this.state.colorArray.length)];
    let thisRandomColor = Object.values(randomColor)
    console.log(randomColor)
    this.state.cardColor = thisRandomColor[0];
    this.state.titleColor = thisRandomColor[1];
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }


handleFormSubmit = (event) => {
  event.preventDefault();

  const cardColor = this.state.cardColor;
  const titleColor = this.state.titleColor;
  const companyName = this.state.companyName;
  const jobTitle = this.state.jobTitle;
  const userId = this.props.userId;
  console.log(companyName);
  console.log(jobTitle);
  if (this.state.companyName && this.state.jobTitle){
    axios.post('/api/newjob', {
      companyName,
      jobTitle,
      cardColor,
      titleColor,
      userId
    })
    .then(res=> window.location.reload())
    .catch(err=> console.log(err));
  }
}
  render() {

    return (
      <div>
        <RaisedButton
        className = "addJob"
        label="Add Job"
        labelPosition="before"
        onClick={this.handleOpen}
        secondary={true}
        style = {{
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
            zIndex: 999
        }}
        // icon={<FontIcon className="material-icons plusBtn">add</FontIcon>}
      />
        <Dialog
          title="Add a new job"
          contentStyle={{
            maxWidth: 500,
          }}
          titleStyle={{
            fontFamily: 'Lobster, cursive',
          }}
          // actions={actions}
          modal={true}
          open={this.state.open}>
            <form onClick = {this.handleFormSubmit}>
            <div className="form-group">
                  <TextField
                    hintText="REQUIRED: name of the company"
                    floatingLabelText="Company Name"
                    className="form-control"
                    type="text"
                    value={this.state.companyName}
                    name="companyName"
                    onChange={this.handleInputChange}
                    required
                    fullWidth={true}
                  />
                <br />
                  <TextField
                    hintText="REQUIRED: name of the position"
                    floatingLabelText="Position"
                    className="form-control"
                    type="text"
                    value={this.state.jobTitle}
                    name="jobTitle"
                    onChange={this.handleInputChange}
                    required
                    fullWidth={true}
                  />
                <br />
              </div>
              <br />
              <div>
              <FlatButton
                label="Cancel"
                secondary={true}
                onClick={this.handleClose}
                style={{
                  float: 'right'
                }}
              />
              <FlatButton
                label="Submit"
                secondary={true}
                onClick={this.handleClose}
                type="submit"
                className="submit"
                style={{
                  float: 'right'
                }}
              />
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default AddCardModal;
