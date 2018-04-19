import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import './style.css'

class NavTabs extends Component {

render(){
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

  return(
  <div>
  <h3 style={styles.title}>nextGig</h3>
  <Tabs>
    <Tab
      value="apply"
      onActive={() => this.props.handleClick("apply")}
      className="TabNav"
      label="to apply">

    </Tab>
    <Tab
      value="applied"
      onActive={() => this.props.handleClick("applied")}
      className="TabNav"
      label="applied"
      value="applied"
      onClick={this.props.handleFilter} >

    </Tab>
    <Tab
      value="interview"
      onActive={() => this.props.handleClick("interviewing")}
      className="TabNav"
      label="interview"
      value="interviewing"
      onClick={this.props.handleFilter} >

    </Tab>
    <Tab
      value="offer"
      onActive={() => this.props.handleClick("offer")}
      className="TabNav"
      label="offer"
      value="offer"
      onClick={this.props.handleFilter} >

    </Tab>
    <Tab
      value="rejected"
      onActive={() => this.props.handleClick("rejected")}
      className="TabNav"
      label="rejected"
      value="rejected"
      onClick={this.props.handleFilter}>

    </Tab>
  </Tabs>
  </div>
);
}
}
export default NavTabs;
