import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import './style.css'

class NavTabs extends Component {
state = {

}

// const styles = {
//   headline: {
//     fontSize: 24,
//     paddingTop: 16,
//     marginBottom: 12,
//     fontWeight: 400,
//   },
//   title: {
//     margin: 0,
//   }
// };
render () {
  const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  title: {
    margin: 0,
  }
};
  return (
<div>
  <h3 style={styles.title}>Cool App Name</h3>
  <Tabs >
    <Tab

      className="TabNav"
      label="to apply"
      value="apply"
      onClick={this.props.handleFilter}>

    </Tab>
    <Tab
      className="TabNav"
      label="applied"
      value="applied"
      onClick={this.props.handleFilter} >

    </Tab>
    <Tab
      className="TabNav"
      label="interview"
      value="interviewing"
      onClick={this.props.handleFilter} >

    </Tab>
    <Tab
      className="TabNav"
      label="offer"
      value="offer"
      onClick={this.props.handleFilter} >

    </Tab>
    <Tab
      className="TabNav"
      label="rejected"
      value="rejected"
      onClick={this.props.handleFilter}>

    </Tab>
  </Tabs>
  </div>
    )
}
}
export default NavTabs;
