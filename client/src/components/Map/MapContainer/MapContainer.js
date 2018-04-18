import React, { Component } from 'react';
import axios from 'axios';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import HomeSetModal from "./HomeSetModal";

export class MapContainer extends Component {

  state = {
    home: {},
    markers: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  componentDidMount() {
    this.loadLocations();
    console.log(this.props.home);
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

  const homeSet = this.props.homeSet;
  const homeSetModal = homeSet ? (
    <HomeSetModal
      userId={this.props.user.id}
      modalOpen={false}
    />
  ) : (
    <HomeSetModal
      userId={this.props.user.id}
      modalOpen={true}
    />
  );

    return (
    <div>
      <Map
        google={this.props.google}
        zoom={13}
        initialCenter={{
            lat: this.props.home.lat,
            lng: this.props.home.lng
          }}
      >
        <Marker
          onClick={this.onMarkerClick}
          title={'Home'}
          name={'Home'}
          position={this.props.home}
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
      {homeSetModal}
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBAQEBzkSGDkjSM4p4EukoAdsqQW-k_WVA')
})(MapContainer)