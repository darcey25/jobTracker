import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

class SetStage extends Component {
  state = {
    stage: this.props.stage,
    open: false,
    id: this.props.id,
  };

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div
      style={{
          float: "right"}}>
        <RaisedButton
          onClick={this.handleClick}
          label="Set Stage"
          secondary={true}
          
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem id = {this.state.id} 
            onClick={() =>this.props.handleStage("apply", this.state.id)} 
            primaryText="To Apply" 
            value = "apply" />
            <MenuItem id = {this.state.id} 
            onClick={() =>this.props.handleStage("applied", this.state.id)}  
            primaryText="Applied" 
            value = "applied" />
            <MenuItem id = {this.state.id} 
            onClick={() =>this.props.handleStage("interviewing", this.state.id)} 
            primaryText="Interviewing" 
            value = "interviewing"/>
            <MenuItem id = {this.state.id} 
            onClick={() =>this.props.handleStage("offer", this.state.id)} 
            primaryText="Offer" 
            value = "offer" />
            <MenuItem id = {this.state.id} 
            onClick={() =>this.props.handleStage("rejected", this.state.id)} 
            primaryText="Rejected" 
            value = "rejected"/>

          </Menu>
        </Popover>
      </div>
    );
  }
}

export default SetStage;