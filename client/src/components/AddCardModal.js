import axios from 'axios';
import React, { Component } from 'react';
// import AddJobForm from './AddJobForm';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './style.css'
// import API from '../utils/API';

class AddCardModal extends Component {
  state = {
    companyName: "",
    jobTitle: "",
    open: false
  }


  handleOpen = () => {
    this.setState({open: true});
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
  const companyName = this.state.companyName;
  const jobTitle = this.state.jobTitle;
  console.log(companyName);
  console.log(jobTitle);
  if (this.state.companyName && this.state.jobTitle){
    axios.post('/api/newjob', {
      companyName,
      jobTitle
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
