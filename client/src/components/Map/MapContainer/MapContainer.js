import React, { Component } from 'react';
import axios from 'axios';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import HomeSetModal from "./HomeSetModal";

export class MapContainer extends Component {

  state = {
    home: {
      'lat': 30.2672,
      'lng': -97.7431
    },
    markers: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  componentDidMount() {

    this.loadHome();
    this.loadLocations();
    console.log(this.state.home);
    console.log(this.state.home.lat);
    console.log(this.state.home.lng);

  }

  loadHome = () => {
    axios.get('api/user/' + this.props.user.id)
      .then(res => {
        console.log(res.data.position[0])
        this.setState({
          home: res.data.position[0]
        });
        console.log(this.state.home.lat);
      })
      // .catch(err => {
      //   console.log(err);
      //   this.setState({
      //     home: {
      //       'lat': 30.2672,
      //       'lng': -97.7431
      //     }
      //   });
      // });
  }

  loadLocations = () => {
    axios.get('/api/locations')
      .then(res => {
        this.setState({
          markers: res.data
        });
      })
      .catch(err => {
        this.setState({
          markers: []
        });
      });
  }


  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

render() {

    return (
    <div>
      <Map
        google={this.props.google}
        zoom={13}
        initialCenter={{
            lat: this.state.home.lat,
            lng: this.state.home.lng
          }}
      >
        <Marker
          onClick={this.onMarkerClick}
          title={'Home'}
          name={'Home'}

        />
        {this.state.markers.map(item => {
          return (
            <Marker
              onClick={this.onMarkerClick}
              key={item._id}
              title={item.companyName}
              name={item.companyName}
              position={item.position[0]}
            />
          )
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          onOpen={this.windowHasOpened}
          onClose={this.windowHasClosed}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.title}</h1>
            </div>
        </InfoWindow>
      </Map>
      <HomeSetModal
        userId={this.props.user.id}
      />
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBAQEBzkSGDkjSM4p4EukoAdsqQW-k_WVA')
})(MapContainer)
