import axios from 'axios';
import React, { Component } from 'react';
import AddJobForm from './AddJobForm';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {red500} from 'material-ui/styles/colors';
import './style.css'

class AddCardModal extends Component {
  state = {
    companyName: "",
    jobTitle: "",
    open: false
  };


  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();
    //this.getcards();
    }; 
  
 



  render() {


    const actions = [

      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleClose}
        onClick={this.handleFormSubmit}
        type="submit"
        className="submit"
      />,
    ];

    return (
      <div>
        <RaisedButton
        className = "addJob"
        label="Add Job" 
        labelPosition="before"
        onClick={this.handleOpen} 
        primary={true}
        >
        <FontIcon className="material-icons" color={red500}>add</FontIcon>
        </RaisedButton>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={true}
          open={this.state.open}>
            <AddJobForm
     className = "addJobForm"
    handleInputChange={this.handleInputChange}
    handleFormSubmit={this.handleFormSubmit}
    companyName={this.state.companyName}
    jobTitle={this.state.jobTitle}
    />
        </Dialog>
      </div>
    );
  }
}

export default AddCardModal;

