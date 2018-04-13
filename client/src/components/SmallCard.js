import React, { Component } from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import './style.css'
import {blue500, blue900, red500, greenA200} from 'material-ui/styles/colors';




class SmallCard extends Component{
  state = {
    cardData: []

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


render(){
  return(
  <div
  style = {{
    display: "flex",
    flexWrap: "wrap"}}>
    {this.state.cardData.map((item, index)=>{
      return(
        <Card key={index}
          className="jobCard"
          style = {{
            backgroundColor: blue500
            }}>
            <CardHeader
              title={item.companyName}
              subtitle={item.jobTitle}
             
              id={item._id}
              
              style = {{
                backgroundColor: blue900
              }}
            />
            <CardActions>
              <FlatButton 
              id={item._id}
              onClick={() => this.deleteJob(item._id)}>

                <FontIcon className="material-icons">delete</FontIcon>
              </FlatButton>
            </CardActions>
           
          </Card>
          );
        })}
  </div>
  );
}
}
export default SmallCard;

// <IconButton iconClassName="muidocs-icon-action-delete" />