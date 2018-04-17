import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import Info from './Info';
import Calendar from './Calendar';
import Contacts from './Contacts';
import Notes from './Notes';

class CardExpand extends Component {
  state = {

    info: this.props.cardData.info,
    id: this.props.cardData._id,
    companyName: this.props.cardData.companyName,
    jobTitle: this.props.cardData.jobTitle,
    pickedTab: null,
  };

  componentDidMount() {
    this.setState({pickedTab: <Info id={this.state.id} companyName={this.state.companyName} jobTitle={this.state.jobTitle} info={this.state.info}/>})
  }

  // loadCards = () => {
  //   axios.get('/api/newjob/' + this.props.cardData._id).then(res=>
  //     this.setState({info: res.data.info}))
      // this.setState({info: res.data.info})
    // ).then(this.setState({info: this.state.cardData.info}))



  // handleChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // }

  handleClick = choice => {
    this.setState({pickedTab:choice});
  };


  // UpdateInfo = id => {
  //   axios.patch('/api/newjob/' + id, {
  //     info: this.state.info
  //   })
  //   .then(res=> res.json())
  //   .catch(err=> console.log(err));

  render(){
    let Active = this.state.pickedTab;
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
            <MenuItem leftIcon={<FontIcon className="material-icons" onClick={() => this.handleClick(<Info id={this.state.id} companyName={this.state.companyName} jobTitle={this.state.jobTitle} info={this.state.info}/>)}>info</FontIcon>} />
            <MenuItem leftIcon={<FontIcon className="material-icons" onClick={() => this.handleClick(<Contacts id={this.state.id}/>)}>supervisor_account</FontIcon>} />
            <MenuItem leftIcon={<FontIcon className="material-icons" onClick={() => this.handleClick(<Calendar id={this.state.id}/>)}>event</FontIcon>} />
            <MenuItem leftIcon={<FontIcon className="material-icons" onClick={() => this.handleClick(<Notes id={this.state.id}/>)}>list</FontIcon>} />
          </Menu>
        </Paper>
        <Paper style={style.paperMain}>
          <div> 
            {Active}
          </div>
        </Paper>
        </div>
            <br />
              <div>
              <FlatButton
                label="Cancel"
                secondary={true}
                //handle close
                onClick={this.handleClose}
                style={{
                  float: 'right'
                }}
              />
              <FlatButton
                label="Submit"
                secondary={true}
                onClick={this.handleClose}
                type="submit"
                className="submit"
                style={{
                  float: 'right'
                }}
              />
            </div>
      </div>
    );
  }
}

export default CardExpand
