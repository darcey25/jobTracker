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

  colorChange = (x,y) =>{
    console.log(x +y);

  };

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
          >JobNote</h1>
          <MenuItem onClick={this.handleClose} href="/">Jobs</MenuItem>
          <MenuItem onClick={this.handleClose} href="/calendar">Calendar</MenuItem>
          <MenuItem onClick={this.handleClose} href="/map">Map</MenuItem>
          {/* <MenuItem
            primaryText="Color Theme"
            rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem primaryText="Blue/Orange"
            onClick={() => this.colorChange("lightBlue500","orange500")}
               />,
            <MenuItem primaryText="Teal/Indigo"
            onClick={() => this.colorChange("teal500","indigo500")}
               />,
            <MenuItem primaryText="Indigo/Pink"
            onClick={() => this.colorChange("indigo500","pink500")}
           />,
            <MenuItem primaryText="Grey/Orange"
            onClick={() => this.colorChange("blueGrey500","orange500")}
            />,
          ]}
          /> */}
          <MenuItem onClick={this.handleClose} href="/help">Help</MenuItem>
        </Drawer>
      </div>
    );
  }
}
