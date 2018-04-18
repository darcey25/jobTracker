import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { withUser } from '../services/withUser';
import LoadingContainer from '../components/Map/LoadingContainer';

class MapPage extends Component {
  state = {
    stuff: null,
    locations: [],
    homeSet: false,
    home: {
      "lat": 30.2672,
      "lng": -97.7431
    }
  }

  componentDidMount() {
    // only try loading stuff if the user is logged in.
    if (!this.props.user) {
      console.log("No user detected");
      return;
    }

    this.loadHome();

    axios.get('/api/stuff')
      .then(res => {
        this.setState({
          stuff: res.data
        });
      })
      .catch(err => {
        // if we got an error, we'll just log it and set stuff to an empty array
        console.log(err);
        this.setState({
          stuff: []
        });
      });
  }

  loadHome = () => {
    axios.get('api/user/' + this.props.user.id)
      .then(res => {
        this.setState({ homeSet: res.data.homeSet });
        if (res.data.position[0].lat !== "") {
          this.setState({
            home: res.data.position[0]
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          home: {
            'lat': 30.2672,
            'lng': -97.7431
          }
        });
      });
  }

  render() {

    const { user } = this.props; // get the user prop from props

    if (!this.props.loaded) {
      return (
        <Fragment>
          {user &&
            <div>
              <LoadingContainer
                user={this.props.user}
                home={this.state.home}
                homeSet={this.state.homeSet}
               />
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
