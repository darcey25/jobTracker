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
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';


class CardExpand extends Component {
  state = {
    cardData: this.props.cardData,
    info: this.props.cardData.info,
    id: this.props.cardData._id
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  UpdateInfo = id => {
    axios.post('/api/newjob/' + id, {
      info: this.state.info
    })
    .then(res=> res.json())
    .catch(err=> console.log(err));
  }

  render() {
console.log(this.state)
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
        <h1>{this.state.cardData.companyName} - {this.state.cardData.jobTitle} </h1>
        <Divider />
        <div className="main">
        <Paper style={style.paperMenu}>
          <Menu
            disableAutoFocus={true}
            >
            <MenuItem leftIcon={<Info />} />
            <MenuItem leftIcon={<SupervisorAccount />} />
            <MenuItem leftIcon={<Event />} />
            <MenuItem leftIcon={<List />} />
          </Menu>
        </Paper>
        <Paper style={style.paperMain}>
          <form>
            <div className="form-group">
              <TextField
              id="text-field-controlled"
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
              fullWidth={true}
              multiLine={true}
            />
            <FlatButton
              label="Submit"
              onClick={() => this.UpdateInfo(this.state.id)}
              secondary={true}
              type="submit"
              className="submit"
              style={{
                float: 'right'
              }}
            />
            </div>
          </form>
        </Paper>
        </div>
      </div>
    );
  }
}

export default CardExpand
