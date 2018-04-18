import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import MapContainer from "../MapContainer";
import LinearProgress from 'material-ui/LinearProgress';
import "./LoadingContainer.css";

const LoadingContainer = (props) => (
  <div className="progressBar">
    <h2>
      <i className="material-icons">location_on</i><br />
      Map loading...
    </h2>
    <LinearProgress mode="indeterminate" />
  </div>
)
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBAQEBzkSGDkjSM4p4EukoAdsqQW-k_WVA'),
  LoadingContainer: LoadingContainer
})(MapContainer)
