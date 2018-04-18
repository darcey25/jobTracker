import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import './style.css'

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

const TabsExampleSimple = () => (
  <div>
  <h3 style={styles.title}>Cool App Name</h3>
  <Tabs >
    <Tab

       className="TabNav"
    label="to apply">

    </Tab>
    <Tab
      className="TabNav"
      label="applied" >

    </Tab>
    <Tab
      className="TabNav"
      label="interview" >

    </Tab>
    <Tab
      className="TabNav"
      label="offer" >

    </Tab>
    <Tab
      className="TabNav"
      label="rejected">

    </Tab>
  </Tabs>
  </div>
);

export default TabsExampleSimple;
