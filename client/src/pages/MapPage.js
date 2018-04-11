import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { withUser } from '../services/withUser';
import MapContainer from '../components/Map/MapContainer';
import LoadingContainer from '../components/Map/LoadingContainer';

class MapPage extends Component {
  state = {
    stuff: null,
    locations: []
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
  }

  render() {

    const { user } = this.props; // get the user prop from props
    const { stuff } = this.state; // get stuff from state

    if (!this.props.loaded) {
      return (
        <Fragment>
          {user &&
            <div>
              <LoadingContainer />
            </div>
          }
          {!user &&
            <div>Hey! I don't recognize you! Register and log in using the link above</div>
          }
        </Fragment>
      );
    }

  }

}

// withUser function will wrap the specified component in another component that will
// inject the currently logged in user as a prop called "user"
export default withUser(MapPage);
