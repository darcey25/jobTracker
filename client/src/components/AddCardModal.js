import axios from 'axios';
import React, { Component } from 'react';
// import AddJobForm from './AddJobForm';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {orange500} from 'material-ui/styles/colors';
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
        primary={true}
        >
        <FontIcon className="material-icons" color={orange500}>add</FontIcon>
        </RaisedButton>
        <Dialog
          title="Dialog With Actions"
          // actions={actions}
          modal={true}
          open={this.state.open}>
            <form onClick = {this.handleFormSubmit}>
            <div className="form-group">
              <h4>
                <strong>Add Company Name</strong>
              </h4>
              <input
                className="form-control"
                type="text"
                value={this.state.companyName}
                name="companyName"
                onChange={this.handleInputChange}
                required
              />
              <h4>
                <strong>Add Job Title</strong>
              </h4>
              <input
                className="form-control"
                type="text"
                value={this.state.jobTitle}
                name="jobTitle"
                onChange={this.handleInputChange}
                required
              />
              </div>
              <div>
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
              />
              <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleClose}
                type="submit"
                className="submit"
              />
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default AddCardModal;

