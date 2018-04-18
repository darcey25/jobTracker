import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios';

class LocationSearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      id: this.props.id
    }
  }

  componentDidMount() {
    console.log(this.props.id);
  }

  handleChange = (address) => {
    this.setState({ address });
  }

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        console.log(this.props.purpose);
        if (this.props.purpose === 'setMarker') {
          axios.patch('/api/newjob/' + this.props.id, {
            position: latLng
          })
        }
        else if (this.props.purpose === 'setHome') {
          axios.patch('/api/user/' + this.props.userId, {
            position: latLng,
            homeSet: true
          })
        }
      })
  }

  render() {
    return (
      <PlacesAutocomplete
        style={{marginLeft: 20}}
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Address ...',
                className: 'location-search-input',
                style: {marginLeft: 20, height: 20, width: 385}
              })}
            />
            <div className="autocomplete-dropdown-container">
              {suggestions.map(suggestion => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div {...getSuggestionItemProps(suggestion, { className, style })}>
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;