import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import axios from 'axios';
import Info from './Info';
import CalendarForm from './CalendarForm';
import Contacts from './Contacts';
import Notes from './Notes';
import SetStage from './SetStage';



class CardExpand extends Component {
  state = {
    info: this.props.cardData.info,
    id: this.props.cardData._id,
    companyName: this.props.cardData.companyName,
    jobTitle: this.props.cardData.jobTitle,
    notes: this.props.cardData.notes,
    pickedTab: null,
    stage: null,
  };

  componentDidMount() {
    this.setState({pickedTab: <Info id={this.state.id} info={this.state.info}/>})
  }

handleStage = (stage, id) => {
    this.setState({stage:stage});
    axios.patch('/api/newjob/' + id, {
      stage: stage
    })
    .then(res=> res.json())
    .catch(err=> console.log(err));
    this.props.loadCards(this.props.userId);
  };

  handleClick = choice => {
    this.setState({pickedTab:choice});
  };

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
        <SetStage
        id = {this.state.id}
        handleStage = {this.handleStage}/>
        <h1>{this.state.companyName} - {this.state.jobTitle} </h1>
        <Divider />
        <div className="main">
        <Paper style={style.paperMenu}>

          <Menu
            menuItemStyle={{width: 144}}
            disableAutoFocus={true}
            >
            <MenuItem onClick={() => this.handleClick(<Info id={this.state.id} info={this.state.info}/>)} leftIcon={<FontIcon className="material-icons" >info</FontIcon>} />
            <MenuItem onClick={() => this.handleClick(<Contacts id={this.state.id}/>)} leftIcon={<FontIcon className="material-icons" >supervisor_account</FontIcon>} />
            <MenuItem onClick={() => this.handleClick(<CalendarForm id={this.state.id}/>)} leftIcon={<FontIcon className="material-icons" >event</FontIcon>} />
            <MenuItem onClick={() => this.handleClick(<Notes id={this.state.id} notes={this.state.notes}/>)} leftIcon={<FontIcon className="material-icons" >list</FontIcon>} />

          </Menu>
        </Paper>
        <Paper style={style.paperMain}>
          <div>
            {Active}
          </div>
        </Paper>
        </div>
      </div>
    );
  }
}

export default CardExpand
