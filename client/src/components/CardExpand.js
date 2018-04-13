import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Info from 'material-ui/svg-icons/action/info';
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';
import Event from 'material-ui/svg-icons/action/event';
import List from 'material-ui/svg-icons/action/list';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';



class CardExpand extends Component {
  


  render() {
    
    const style = {
      paperMenu: {
        display: 'inline-block',
        float: 'left',
        margin: '16px 16px 16px 0',
        width: '20%',
      },
      paperMain: {
        display: 'inline-block',
        float: 'right',
        width: '65%',
        margin: '16px 0 16px 10px',
        width: '75%',
        padding: 10,
      },
      rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
      },
    };
    return (
      <div>
        <h1>Google - Developer </h1>
        <Divider />
        <div className="main">
        <Paper style={style.paperMenu}>
          <Menu>
            <MenuItem leftIcon={<Info />} />
            <MenuItem leftIcon={<SupervisorAccount />} />
            <MenuItem leftIcon={<Event />} />
            <MenuItem leftIcon={<List />} />
          </Menu>
        </Paper>
        <Paper style={style.paperMain}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet est ac nisi convallis scelerisque vel a arcu. Cras ultricies vel lectus commodo ultrices. Maecenas euismod pellentesque iaculis. Nulla bibendum, sapien id rhoncus bibendum, lorem massa cursus justo, id imperdiet arcu erat eu ante. Nulla egestas scelerisque nulla et convallis. Quisque consequat dignissim nibh eget finibus. Aliquam est mauris, ornare eu urna fermentum, iaculis pharetra leo.
          </p>
        </Paper>
        </div>
      </div>
    );
  }
}

export default CardExpand