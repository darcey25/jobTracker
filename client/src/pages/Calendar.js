import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { withUser } from '../services/withUser';
import BigCalendar from 'react-big-calendar';
// import events from '../events'
import { Grid, Row } from 'react-flexbox-grid';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

BigCalendar.momentLocalizer(moment);


class Calendar extends Component {

  state = {
    stuff: null,
    open: false,
    events: []
  }

  componentDidMount() {
    // only try loading stuff if the user is logged in.
    if (!this.props.user) {
      console.log("No user detected");
      console.log(this.props);
      console.log(this.props.user);
      return;
    }
    axios.get('/api/stuff')
      .then(res => {
        this.setState({
          stuff: res.data
        });
        console.log(this.state.stuff);
        console.log("Something");
      })
      .catch(err => {
        // if we got an error, we'll just log it and set stuff to an empty array
        console.log(err);
        this.setState({
          stuff: []
        });
      });

    this.loadDates();
  }

  loadDates = () =>{
    axios.get('/api/locations')
      .then(res => {
        let id = 0
        let tempEvents=[];
        let dateArray = res.data;
        dateArray.map(item=>{
          if(item.dateInfo[0] !== undefined){

          tempEvents.push(
            {
              id: id,
              title: item.dateInfo[0].dateDesc,
              start: new Date(item.dateInfo[0].date),
              end: new Date(item.dateInfo[0].date),
            }
          )
          id++
        }
        })
        this.setState({
          events : tempEvents
        });
        console.log(tempEvents)
      })
      .catch(err => {
        console.log(err);
      });
    }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  render() {
    const { user } = this.props; // get the user prop from props
    const { stuff } = this.state; // get stuff from state

    return (
      <Fragment>
        {user &&
          <div>
            <Grid fluid>
              <Row>
                <BigCalendar
                  events={this.state.events}
                  views={['month', 'day', 'agenda']}
                  step={30}
                  showMultiDayTimes
                  defaultDate={new Date()}
                  className = "Calendar"
                  onSelectEvent={this.handleOpen}
                />
              </Row>
            </Grid>
          <Dialog
          title="Calendar Event"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          subTitle={this.state.events.title}//figure out display
          >
          <FlatButton
          label="Close"
          primary={true}
          onClick={this.handleClose}
          />
          
          </Dialog>
          </div>
        }
        {!user &&
          <div>Hey! I don't recognize you! Register and log in using the link above</div>
        }
      </Fragment>
    );
  }
}

export default withUser(Calendar);
