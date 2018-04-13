import React, { Component } from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {red500, red400, pink500, pink400, purple500, purple400, deepPurple500, deepPurple400, blue500, blue400, orange500, orange400, cyan500, cyan400, teal500, teal400, lightBlue500, lightBlue400, amber500, amber400, deepOrange500, deepOrange400, indigo500, indigo400, green500, green400, blueGrey500, blueGrey400} from 'material-ui/styles/colors';
import './style.css'




class SmallCard extends Component{
  state = {
    cardData: [],
    colorArray: [
      {red500, red400},{pink500, pink400},{purple500, purple400},{deepPurple500, deepPurple400},{blue500, blue400},{orange500, orange400},{cyan500, cyan400},{teal500, teal400}, {lightBlue500, lightBlue400},{amber500, amber400}, {deepOrange500, deepOrange400}, {indigo500, indigo400}, {green500, green400}, {blueGrey500, blueGrey400}
    ]
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
    style={{
      display: "flex",
      flexWrap: "wrap"
    }}
    >
    {this.state.cardData.map((item, index)=>{
      let randomColor = this.state.colorArray[Math.floor(Math.random() * this.state.colorArray.length)];
      let thisRandomColor = Object.values(randomColor)
      console.log(thisRandomColor)
      return(
        <Card key={index}
          className="jobCard"
          style={{
            margin: "8px",
            backgroundColor: thisRandomColor[0]
          }}
          >
            <CardHeader
              title={item.companyName}
              subtitle={item.jobTitle}
              // actAsExpander={true}
              // showExpandableButton={true}
              id={item._id}
              style={{
                backgroundColor: thisRandomColor[1],
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
              }}

              >
              <FlatButton
              id={item._id}
              onClick={() => this.deleteJob(item._id)}>

                <FontIcon className="material-icons">delete</FontIcon>
              </FlatButton>
            </CardActions>
            {/* <CardText expandable={true}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText> */}
          </Card>
          );
        })}
  </div>
  );
}
}
export default SmallCard;

// <IconButton iconClassName="muidocs-icon-action-delete" />
