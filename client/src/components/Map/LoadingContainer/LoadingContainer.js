import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import MapContainer from "../MapContainer";

const LoadingContainer = (props) => (
  <div>Loading...</div>
)
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBAQEBzkSGDkjSM4p4EukoAdsqQW-k_WVA'),
  LoadingContainer: LoadingContainer
})(MapContainer)