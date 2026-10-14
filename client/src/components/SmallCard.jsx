import React, { Component } from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import './style.css'
import Dialog from 'material-ui/Dialog';
import CardExpand from './CardExpand'


class SmallCard extends Component{
  state = {
    cardData: [],
    open: false,
    currentSelectData: [],
  };

componentDidMount() {
  this.loadCards(this.props.userId);
}

loadCards = (userId) => {
  axios.get('/api/job/' + userId).then(res=>
    this.setState({cardData: res.data})
    )
};

deleteJob = id => {
  axios.delete('/api/newjob/' + id)
  .then(res=>
  this.loadCards(this.props.userId))
  .catch(err => console.log(err));
};

handleOpen = (data) => {
    this.setState({currentSelectData: data})
    this.setState({open: true});
};

handleClose = () => {
    this.setState({open: false});
};

render(){

  let activeCard  = this.state.cardData.filter(val => {
   return val.stage === this.props.activeTab
    });
  return(
  <div
    style={{
      display: "flex",
      flexWrap: "wrap"
    }}
    >
    {activeCard.map((item, index)=>{
      return(
        <Card key={index}
          className="jobCard"
          style={{
            margin: "8px",
            backgroundColor: item.cardColor
          }}
          >
            <CardHeader
              onClick={() => this.handleOpen(item)}
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
          </Card>
          );
        })}
        <div>
          <Dialog
            bodyStyle={{overflow: "auto"}}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <CardExpand
            cardData = {this.state.currentSelectData}
            loadCards = {this.loadCards}
            userId= {this.props.userId}
          />
          </Dialog>
        </div>
  </div>
  );
}
}
export default SmallCard;
