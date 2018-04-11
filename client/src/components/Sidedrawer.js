import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {white} from 'material-ui/styles/colors';
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
     <FontIcon className="material-icons" color={white}>dehaze</FontIcon>
    </IconButton>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
        <h1
          style={{
            fontFamily: 'Lobster, cursive',
            marginLeft: 5,
            marginRight: 5,
          }}
          >Cool App Name</h1>
          <MenuItem onClick={this.handleClose} href="/">Jobs</MenuItem>
          <MenuItem onClick={this.handleClose} href="/calendar">Calendar</MenuItem>
          <MenuItem onClick={this.handleClose} href="/map">Map</MenuItem>
          <MenuItem onClick={this.handleClose} href="/help">Help</MenuItem>
        </Drawer>
      </div>
    );
  }
}
