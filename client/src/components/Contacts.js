import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';
import {indigo500} from 'material-ui/styles/colors';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import Location from 'material-ui/svg-icons/communication/location-on';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Subheader from 'material-ui/Subheader';
import LocationSearchInput from "./LocationSearchInput.js"

class Contacts extends Component {
  state = {
    name: "",
    phoneNumber: "",
    email: "",
    id: this.props.id,
    open: false,
  };

  componentDidMount() {
    this.loadName();
    this.loadEmail();
    this.loadNumber();
  }

  loadName = () => {
    axios.get('/api/newjob/' + this.props.id).then(res=> {
    	if (res.data.contacts[0] === undefined) {
      		this.setState({name: ""})
    	} else {
    		this.setState({name: res.data.contacts[0].name })
    	}
    });
      // this.setState({info: res.data.info})
    // ).then(this.setState({info: this.state.cardData.info}))
  };
  loadEmail = () => {
    axios.get('/api/newjob/' + this.props.id).then(res=> {
    	if(res.data.contacts[0] === undefined) {
      		this.setState({email: ""})
    	} else {
    		this.setState({email: res.data.contacts[0].email })
    	}
    });
      // this.setState({info: res.data.info})
    // ).then(this.setState({info: this.state.cardData.info}))
  };
  loadNumber = () => {
    axios.get('/api/newjob/' + this.props.id).then(res=> {
    	if(res.data.contacts[0] === undefined) {
      		this.setState({phoneNumber: ""})
    	} else {
    		this.setState({phoneNumber: res.data.contacts[0].phoneNumber })
    	}
    });
      // this.setState({info: res.data.info})
    // ).then(this.setState({info: this.state.cardData.info}))
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  UpdateInfo = id => {
    axios.patch('/api/newjob/' + id, {
       contacts: {name: this.state.name, phoneNumber: this.state.phoneNumber, email: this.state.email}
    })
    .then(res=> res.json())
    .catch(err=> console.log(err));
  }

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };


  render(){
    const style = {
    marginLeft: 20,
    };
    return(
  <div>
    <Subheader>Contacts</Subheader>
    <form>
    <List>
      <ListItem
        leftIcon={<AccountCircle color={indigo500} />}
        primaryText={<TextField
	    	style={style}
	    	hintText="Name"
	    	fullWidth={true}
	    	id="text-field-controlled"
	    	name="name"
	    	value={this.state.name}
	    	onChange={this.handleChange}
	    />}
        onNestedListToggle={this.handleNestedListToggle}
        nestedItems={[
	      <ListItem
	     	innerDivStyle={{marginLeft: 0}}
	        leftIcon={<CommunicationCall color={indigo500} />}
	        primaryText={<TextField
	        underlineStyle={{width: 392}}
	    	style={style}
	    	hintText="Phone number"
	    	fullWidth={true}
	    	id="text-field-controlled"
	    	name="phoneNumber"
	    	value={this.state.phoneNumber}
	    	onChange={this.handleChange}
	    />}
	      />,
	      <ListItem
	      	innerDivStyle={{marginLeft: 0}}
	        leftIcon={<CommunicationEmail color={indigo500} />}
	        primaryText={<TextField
	        underlineStyle={{width: 392}}
			style={style}
			hintText="Email address"
			fullWidth={true}
			id="text-field-controlled"
			name="email"
			value={this.state.email}
			onChange={this.handleChange}
		/>}
  		/>,
        <ListItem
          innerDivStyle={{marginLeft: 0}}
          leftIcon={<Location color={indigo500} />}
          primaryText={<LocationSearchInput id={this.state.id}
          purpose={'setMarker'}
          style={style}
         />}
        />
	    ]}
      />
    </List>
    <FlatButton
              label="Save"
              onClick={() => this.UpdateInfo(this.state.id)}
              secondary={true}
              style={{
                float: 'right'
              }}
            />
    </form>
  </div>
);
}
}

export default Contacts;
