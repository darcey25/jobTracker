import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import  Sidedrawer from '../Sidedrawer';
import LoginButton from '../LoginButton';
import LoginMenu from '../LoginMenu';
import Navtabs from '../Navtabs';

import { update } from '../../services/withUser';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
      title={user ? <Navtabs /> : "Cool App Name"}
      showMenuIconButton={true}
      iconElementLeft={
        <Sidedrawer/>
      }
      iconElementRight={user ?
        <LoginMenu username={username} onLogOut={handleLogOut} />
        : <LoginButton onClick={handleLogIn} />}
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
        <LoginMenu username={username} onLogOut={handleLogOut} />
        : <LoginButton onClick={handleLogIn} />}
        >
    </AppBar>}/>
    </Switch>
    
    </div>
    </Router>

  )
};

export default withRouter(Navbar);