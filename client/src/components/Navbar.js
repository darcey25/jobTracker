import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import  Sidedrawer from './Sidedrawer';
import Navtabs from './Navtabs';
import LoginButton from './LoginButton';
import LoginMenu from './LoginMenu';
import {Tabs, Tab} from 'material-ui'

import { update } from '../services/withUser';

const styles = {
  nav: {
    height: 200,
  },
  title: {
    overflow: "visible",
  }
};

const Navbar = (props) => {
  const { user } = props;
  const username = user ? user.username : null;
  const handleLogIn = () => {
    props.history.push('/login');
  };
  const handleLogOut = () => {
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
  return (
    <div>

    <AppBar style={styles.nav}
      titleStyle= {styles.title}
      title={<Navtabs />}
      showMenuIconButton={true}
      iconElementLeft={
        <Sidedrawer/>
      }
      iconElementRight={user ?
        <LoginMenu username={username} onLogOut={handleLogOut} />
        : <LoginButton onClick={handleLogIn} />}
    >
 
    </AppBar>

    </div>

  )
};

export default withRouter(Navbar);
