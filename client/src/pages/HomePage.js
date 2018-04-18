import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { List, ListItem } from 'material-ui/List';
import { withUser } from '../services/withUser';
import SmallCard from '../components/SmallCard';
import AddCardModal from '../components/AddCardModal';

class HomePage extends Component {
  state = {
  }
  componentDidMount() {
    // only try loading stuff if the user is logged in.
    if (!this.props.user) {
      console.log(this.props);
      console.log(this.props.user);
      return;
    }

    console.log(this.props);

    axios.get('/api/stuff')
      .then(res => {
        this.setState({
          stuff: res.data
        });
      })
      .catch(err => {
        // if we got an error, we'll just log it and set stuff to an empty array
        console.log(err);
        this.setState({
          stuff: []
        });
      });
  }
  render() {
    const { user } = this.props; // get the user prop from props
    const { stuff } = this.state; // get stuff from state

    return (
      <Fragment>
        {user && stuff &&
          <div>
          <List>
           {stuff.map((s, i) => <ListItem key={i} primaryText={s} />)}
          </List>
          <SmallCard/>
          <AddCardModal/>
        </div>
        }
        
        {!user &&
          <div
            style={{
              textAlign: "center",
              margin: "auto 20px",
              paddingTop: "30px",
              fontFamily: "Lobster, cursive",
              fontSize: "20px"
            }}
            >Hey! I don't recognize you! Register and log in using the link above</div>
        }
      </Fragment>
    );
  }
}
// withUser function will wrap the specified component in another component that will
// inject the currently logged in user as a prop called "user"
export default withUser(HomePage);
