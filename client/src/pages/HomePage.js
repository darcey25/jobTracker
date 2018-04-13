import React, { Component, Fragment } from 'react';
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


  }
  render() {
    const { user } = this.props; // get the user prop from props

    return (
      <Fragment>
        {user &&
          <div>

          <SmallCard/>
          <AddCardModal/>
          </div>
        }
        
        {!user &&
          <div>Hey! I don't recognize you! Register and log in using the link above</div>
        }
      </Fragment>
    );
  }
}
// withUser function will wrap the specified component in another component that will
// inject the currently logged in user as a prop called "user"
export default withUser(HomePage);
