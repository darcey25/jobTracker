import React, { Component } from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class SetStage extends Component {
  state = {
    stage: this.props.stage,
    open: false,
    id: this.props.id,
  };

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     open: false,
  //   };
  // }

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

  // handleStage = (event) => {
  //   const value = event.target.innerHTML;
  //   console.log(value);
  //   this.setState({
  //     stage: value
  //   });
  // };
  UpdateStage = (id, stage) => {
    console.log("test" + stage);
    axios.patch('/api/newjob/' + id, {
      stage: stage
    })
    .then(res=> res.json())
    .catch(err=> console.log(err));
};

  render() {
    return (
      <div
      style={{
          float: "right"}}>
        <RaisedButton
          onClick={this.handleClick}
          label="Set Stage"
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem id = {this.state.id} onChange={this.props.handleStage} onClick={() => this.UpdateStage (this.state.id, "apply")} primaryText="Need to Apply" value = "apply" />
            <MenuItem id = {this.state.id} onChange={this.props.handleStage} onClick={() => this.UpdateStage (this.state.id, "applied")} primaryText="Applied" value = "applied" />
            <MenuItem id = {this.state.id} onChange={this.props.handleStage} onClick={() => this.UpdateStage (this.state.id, "interviewing")} primaryText="Interviewing" value = "interviewing"/>
            <MenuItem id = {this.state.id} onChange={this.props.handleStage} onClick={() => this.UpdateStage (this.state.id, "offer")} primaryText="Offer" value = "offer" />
            <MenuItem id = {this.state.id} onChange={this.props.handleStage} onClick={() => this.UpdateStage (this.state.id, "rejected")} primaryText="Rejected" value = "rejected"/>

          </Menu>
        </Popover>
      </div>
    );
  }
}

export default SetStage;