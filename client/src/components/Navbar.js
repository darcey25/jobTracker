import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import  Sidedrawer from './Sidedrawer';
import Navtabs from './Navtabs';
import LoginButton from './LoginButton';
import LoginMenu from './LoginMenu';
import {Tabs, Tab} from 'material-ui'
<<<<<<< HEAD
import NavTabs from './Navtabs';
=======
>>>>>>> b9a336f09ba66df1a4a39f4333020420f80186e9
import { update } from '../services/withUser';

class Navbar extends Component {

  state = {
    activeTab: this.props.activeTab,
    value: this.props.value
  };

  handleLogIn = () => {
    props.history.push('/login');
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
  }
  render() {
  console.log("hi I am in navbar");
  console.log("activeTab " + this.state.activeTab);
  console.log("Value " + this.state.value);
  const styles = {
  nav: {
    height: 200,
  },
  title: {
    overflow: "visible",
  }
  };
  const { user } = props;
  const username = user ? user.username : null;
  return (
    <div>
    <Route path="/home" render={() => <div>Home</div>}/>
    <AppBar style={styles.nav}
      titleStyle= {styles.title}
      title=
      showMenuIconButton={true}
      iconElementLeft={
        <Sidedrawer/>
      }
      iconElementRight={user ?
        <LoginMenu username={username} onLogOut={this.handleLogOut} />
        : <LoginButton onClick={this.handleLogIn} />}
    >

    </AppBar>
    <Navtabs handleChange={this.props.handleChange} value={this.state.value} handleClick={this.props.handleClick}/>
    </div>

  )
}
}

export default withRouter(Navbar);
