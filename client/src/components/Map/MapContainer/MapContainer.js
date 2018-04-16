import React, { Component } from 'react';
import axios from 'axios';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {

  state = {
    markers: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  componentDidMount() {

    this.loadLocations();

  }

  loadLocations = () => {
    axios.get('/api/locations')
      .then(res => {
        console.log(res.data);
        this.setState({
          markers: res.data
        });
        console.log("markers", this.state.markers);
      })
      .catch(err => {
        console.log(err);
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
      <Map
        google={this.props.google}
        zoom={13}
        initialCenter={{
            lat: 30.2672,
            lng: -97.7431
          }}
      >
        <Marker
          onClick={this.onMarkerClick}
          title={'Current location'}
          name={'Current location'}
        />
        {this.state.markers.map(item => {
          return (
            <Marker
              onClick={this.onMarkerClick}
              key={item._id}
              title={item.companyName}
              name={item.companyName}
              position={item.position}
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
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBAQEBzkSGDkjSM4p4EukoAdsqQW-k_WVA')
})(MapContainer)
