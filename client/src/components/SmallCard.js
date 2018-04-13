import React, { Component } from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import './style.css'
import Dialog from 'material-ui/Dialog';
import CardExpand from './CardExpand';




class SmallCard extends Component{
  state = {
    cardData: [],
    open: false,
  }

componentDidMount() {
  this.loadCards();
}

loadCards = () => {
  axios.get('/api/newjob').then(res=>
    this.setState({cardData: res.data})
    )
}

deleteJob = id => {
  axios.delete('/api/newjob/' + id)
  .then(res=>
  this.loadCards())
  .catch(err => console.log(err));
}

handleOpen = () => {
    this.setState({open: true});
}

handleClose = () => {
    this.setState({open: false});
}


render(){
  return(
  <div
    style={{
      display: "flex",
      flexWrap: "wrap"
    }}
    >
    {this.state.cardData.map((item, index)=>{

      return(
        <Card key={index}
          className="jobCard"
          onClick={this.handleOpen}
          style={{
            margin: "8px",

            backgroundColor: item.cardColor
          }}
          onClick={this.handleOpen}
          >
            <CardHeader
              title={item.companyName}
              subtitle={item.jobTitle}
              id={item._id}
              style={{
                backgroundColor: item.titleColor,
                paddingRight: "10px",
                minHeight: "81px"
              }}
              titleStyle={{
                color: "#fff",
              }}
              subtitleStyle={{
                color: "#e0e0e0"
              }}
            />

            <CardActions

              style={{
                height: "36px",
                textAlign:"right"
              }}

              >
              <FlatButton
              id={item._id}
              onClick={() => this.deleteJob(item._id)}>
                <FontIcon
                  style={{
                    color: "#fff",
                    float: "right"
                  }}
                  className="material-icons">delete</FontIcon>

              </FlatButton>

            </CardActions>
            <div>
              <Dialog
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
