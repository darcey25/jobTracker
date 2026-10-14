import React, { Component, Fragment } from 'react';
import { withUser } from '../services/withUser';
import SmallCard from '../components/SmallCard';
import AddCardModal from '../components/AddCardModal';
import  { Redirect } from 'react-router-dom';

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
           <Redirect to='/login'  />
        }
      </Fragment>
    );
  }
}
// withUser function will wrap the specified component in another component that will
// inject the currently logged in user as a prop called "user"
export default withUser(HomePage);
