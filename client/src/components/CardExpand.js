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
    info: "",
    id: this.props.cardData._id,
    companyName: this.props.cardData.companyName,
    jobTitle: this.props.cardData.jobTitle,
  };

  componentDidMount() {
    this.loadCards();
  }

  loadCards = () => {
    axios.get('/api/newjob/' + this.props.cardData._id).then(res=>
      this.setState({info: res.data.info}))
      // this.setState({info: res.data.info})
    // ).then(this.setState({info: this.state.cardData.info}))
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  UpdateInfo = id => {
    axios.patch('/api/newjob/' + id, {
      info: this.state.info
    })
    .then(res=> res.json())
    .catch(err=> console.log(err));
  }

  render() {
    const style = {
      paperMenu: {
        display: 'inline-block',
        float: 'left',
        marginTop: "16px",
        marginBottom:"16px",
        marginRight: '2%',
        width: '20%',
      },
      paperMain: {
        display: 'inline-block',
        float: 'right',
        width: '75%',
        marginTop: "16px",
        marginBottom:"16px",
        marginLeft: '2%',
        padding: 10,
      },
      leftIcon: {
        textAlign: 'center',
        lineHeight: '24px',
      },
    };
    return (
      <div>
        <h1>{this.state.companyName} - {this.state.jobTitle} </h1>
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
              label="Save"
              onClick={() => this.UpdateInfo(this.state.id)}
              secondary={true}
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
