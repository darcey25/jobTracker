import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';


export default class DrawerUndockedExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
     <IconButton
     onClick={this.handleToggle}>   
     <FontIcon className="material-icons" color={red500}>dehaze</FontIcon>
    </IconButton>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
        <h1>Cool App Name</h1>
          <MenuItem onClick={this.handleClose}>Jobs</MenuItem>
          <MenuItem onClick={this.handleClose}>Calender</MenuItem>
          <MenuItem onClick={this.handleClose}>Map</MenuItem>
          <MenuItem onClick={this.handleClose}>Help</MenuItem>
        </Drawer>
      </div>
    );
  }
}