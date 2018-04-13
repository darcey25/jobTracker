import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// import Slider from 'material-ui/Slider';

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
    <Tab label="need to apply">
      
    </Tab>
    <Tab label="applied" >
      
    </Tab>
    <Tab label="interviewing" >
     
    </Tab>
    <Tab label="offer" >
     
    </Tab>
    <Tab label="rejected">
      
    </Tab>
  </Tabs>
  </div>
);

export default TabsExampleSimple;