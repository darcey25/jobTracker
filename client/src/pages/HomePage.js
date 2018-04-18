import React, { Component, Fragment } from 'react';
import { withUser } from '../services/withUser';
import SmallCard from '../components/SmallCard';
import AddCardModal from '../components/AddCardModal';

class HomePage extends Component {

  componentDidMount() {
    // only try loading stuff if the user is logged in.
    if (!this.props.user) {
      return;
    }
 }


  render() {
    const { user } = this.props; // get the user prop from props

    return (
      <Fragment>
        {user &&
          <div>
          <SmallCard
            activeTab = {this.props.activeTab}
            userId = {this.props.user.id}
          />
          <AddCardModal
            userId = {this.props.user.id}
          />
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
