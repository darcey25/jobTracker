import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {lightBlue500, orange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Navbar from './components/Nav';
import { withUser, update } from './services/withUser';
import CreateAccountPage from './pages/CreateAccountPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import NotFoundPage from './pages/NotFoundPage';
import HelpPage from './pages/HelpPage';
import Calendar from './pages/Calendar';


class App extends Component {

  state = {
    primaryColor: "",
    accentColor: "",
    activeTab: "apply",
  };

  componentDidMount() {
    // this is going to double check that the user is still actually logged in
    // if the app is reloaded. it's possible that we still have a user in sessionStorage
    // but the user's session cookie expired.
    axios.get('/api/auth')
      .then(res => {
        // if we get here, the user's session is still good. we'll update the user
        // to make sure we're using the most recent values just in case
        update(res.data);
        this.setState({primaryColor: res.data.primaryColor})
        this.setState({accentColor: res.data.accentColor})
      })
      .catch(err => {
        // if we get a 401 response, that means the user is no longer logged in
        if (err.response.status === 401) {
          update(null);
        }
      });
  };


  handleClick = (active) => {
    this.setState({activeTab: active});
   };


  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    const { user } = this.props;


    const muiTheme = getMuiTheme({
        palette: {
          primary1Color: lightBlue500,
          accent1Color: orange500,
        },
      });

    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Fragment>
            <Navbar

              user={user}

              handleClick={this.handleClick}
            />
            <Switch>
              <Route exact path="/" render={()=><HomePage activeTab={this.state.activeTab} />}/>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/create" component={CreateAccountPage} />
              <Route exact path="/map" component={MapPage} />
              <Route exact path="/help" component={HelpPage} />
              <Route exact path="/calendar" component={Calendar} />
              <Route component={NotFoundPage} />
            </Switch>
          </Fragment>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default withUser(App);
