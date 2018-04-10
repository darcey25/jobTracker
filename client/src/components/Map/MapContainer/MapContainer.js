import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

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
        <Marker
          onClick={this.onMarkerClick}
          title={'Sample Place 1'}
          name={'sp1'}
          position={{lat: 30.274838, lng: -97.756184}}
        />
        <Marker
          onClick={this.onMarkerClick}
          title={'Sample Place 2'}
          name={'sp2'}
          position={{lat: 30.264354, lng: -97.741259}}
        />
        <Marker
          onClick={this.onMarkerClick}
          title={'Sample Place 3'}
          name={'sp3'}
          position={{lat: 30.262649, lng: -97.732255}}
        />
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
