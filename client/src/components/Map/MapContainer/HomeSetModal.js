import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LocationSearchInput from "../../LocationSearchInput.js";

class HomeSetModal extends Component {
  state = {
    address: "",
    open: this.props.modalOpen,
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
    window.location.reload();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }


handleFormSubmit = (event) => {
  event.preventDefault();

  const address = this.state.address;
  console.log(address);
}
  render() {

    return (
      <div>
        <RaisedButton
        className = "addJob"
        label="set home"
        labelPosition="before"
        onClick={this.handleOpen}
        secondary={true}
        style = {{
            margin: 0,
            top: 'auto',
            left: 20,
            bottom: 20,
            right: 'auto',
            position: 'fixed',
            zIndex: 999
        }}
        // icon={<FontIcon className="material-icons plusBtn">add</FontIcon>}
      />
        <Dialog
          title="Set home location"
          contentStyle={{
            maxWidth: 500,
          }}
          titleStyle={{
            fontFamily: 'Lobster, cursive',
          }}
          // actions={actions}
          modal={true}
          open={this.state.open}>
            <form onClick = {this.handleFormSubmit}>
            <div className="form-group">
              <LocationSearchInput
                purpose={'setHome'}
                userId={this.props.userId}
              />
              </div>
              <br />
              <div>
              <FlatButton
                label="Cancel"
                secondary={true}
                onClick={this.handleClose}
                style={{
                  float: 'right'
                }}
              />
              <FlatButton
                label="Submit"
                secondary={true}
                onClick={this.handleClose}
                type="submit"
                className="submit"
                style={{
                  float: 'right'
                }}
              />
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default HomeSetModal;
