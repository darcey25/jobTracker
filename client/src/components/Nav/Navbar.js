import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import  Sidedrawer from '../Sidedrawer';
import LoginButton from '../LoginButton';
import LoginMenu from '../LoginMenu';
import Navtabs from '../Navtabs';
import { update } from '../../services/withUser';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Navbar extends Component {

  state = {
    activeTab: this.props.activeTab,
    value: this.props.value
  };


  
  handleLogIn = () => {
    this.props.history.push('/login');
  };
  
  handleLogOut = () => {
    axios.delete('/api/auth')
      .then(() => {
        // unsets the currently logged in user. all components wrapped in withUser
        // will be updated with a null user and rerender accordingly
        update(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log("hi I am in navbar");
  console.log("activeTab " + this.state.activeTab);
  console.log("Value " + this.state.value);
    const { user } = this.props;
    const username = user ? user.username : null;
  return (
  
    <Router>
    <div>
    <Switch>
    <Route exact path="(/|/map)"  render={() => <AppBar
      style={{
        fontFamily: 'Lobster, cursive',
        color: 'white',
        height: 112,
      }}
      titleStyle = {{
        height: "auto",
      }}
      className="AppBar"
      title={user ? <Navtabs handleChange={this.props.handleChange} value={this.state.value} handleClick={this.props.handleClick}/> : "Cool App Name"}
      showMenuIconButton={true}
      iconElementLeft={
        <Sidedrawer/>
      }
      iconElementRight={user ?
        <LoginMenu username={username} onLogOut={this.handleLogOut} />
        : <LoginButton onClick={this.handleLogIn} />}
        >
    </AppBar>}/>
    <Route exact path="(/login|/create|/help|/calendar)" render={() => <AppBar
      style={{
        fontFamily: 'Lobster, cursive',
        color: 'white',
      }}
      titleStyle = {{
        height: "auto",
      }}
      className="AppBar"
      title="Cool App Name"
      showMenuIconButton={true}
      iconElementLeft={
        <Sidedrawer/>
      }
      iconElementRight={user ?
        <LoginMenu username={username} onLogOut={this.handleLogOut} />
        : <LoginButton onClick={this.handleLogIn} />}
        >
    </AppBar>}/>
    </Switch>
    
    </div>
    </Router>

  )
}
};
}
export default withRouter(Navbar);