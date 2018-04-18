import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import Subheader from 'material-ui/Subheader';

class Info extends Component {
  state = {
    info: "",
    id: this.props.id,
  };

  componentDidMount() {
    this.loadCards();
  }

  loadCards = () => {
    axios.get('/api/newjob/' + this.props.id).then(res=>
      this.setState({info: res.data.info}))
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
      info: this.state.info
    })
    .then(res=> res.json())
    .catch(err=> console.log(err));
  }


  render(){
    return(
  <div>
  <Subheader>Job Info</Subheader>
   <form>
            <div className="form-group">
              <TextField
              id="text-field-controlled"
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
              fullWidth={true}
              multiLine={true}
            />
            <FlatButton
              label="Save"
              onClick={() => this.UpdateInfo(this.state.id)}
              secondary={true}
              style={{
                float: 'right'
              }}
            />
            </div>
          </form>

  </div>
);
}
}

export default Info;
