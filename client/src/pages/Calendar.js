import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { withUser } from '../services/withUser';
import BigCalendar from 'react-big-calendar';
// import events from '../events'
import { Grid, Row } from 'react-flexbox-grid';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

BigCalendar.momentLocalizer(moment);

// let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

// let MyCalendar = () => (
//   <BigCalendar
//     // events={events}
//     views={allViews}
//     step={60}
//     showMultiDayTimes
//     defaultDate={new Date(2015, 3, 1)}
//   />
// )

class Calendar extends Component {

  state = {
    stuff: null,
    events: [{
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date("2018-04-10"),
      end: new Date("2018-04-10"),
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date("2018-04-15"),
      end: new Date("2018-04-25"),
    }]
  }

  componentDidMount() {
    // only try loading stuff if the user is logged in.
    if (!this.props.user) {
      console.log("No user detected");
      console.log(this.props);
      console.log(this.props.user);
      return;
    }
  }

  render() {
    const { user } = this.props; // get the user prop from props

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
                />
              </Row>
            </Grid>
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
