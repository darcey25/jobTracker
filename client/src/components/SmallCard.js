import React, { Component } from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import CardExpand from './CardExpand'



class SmallCard extends Component{
  state = {
    cardData: [],
    open: false,
  };

componentDidMount() {
  this.loadCards();
}

loadCards = () => {
  axios.get('/api/newjob').then(res=>
    this.setState({cardData: res.data})
    )
};

deleteJob = id => {
  axios.delete('/api/newjob/' + id)
  .then(res=>
  this.loadCards())
  .catch(err => console.log(err));
  
}

handleOpen = () => {
    this.setState({open: true});
};

handleClose = () => {
    this.setState({open: false});
};



render(){
  const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
  ];
  return(
  <div>
    {this.state.cardData.map((item, index)=>{
      return(
        <Card key={index}
          className="jobCard">
            <CardHeader
              title={item.companyName}
              subtitle={item.jobTitle}
              actAsExpander={true}
              showExpandableButton={true}
              id={item._id}
            />
            <CardActions>
              <FlatButton label="Expand" onClick={this.handleOpen} />
              <FlatButton 
              id={item._id}
              onClick={() => this.deleteJob(item._id)}>
                <FontIcon className="material-icons">delete</FontIcon>
              </FlatButton>
            </CardActions>
            <CardText expandable={true}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
            <div>
              <Dialog
                bodyStyle={{overflow: "auto"}}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
              >
                <CardExpand />
              </Dialog>
            </div>
          </Card>
          );
        })}
  </div>
  );
}
}
export default SmallCard;

// <IconButton iconClassName="muidocs-icon-action-delete" />