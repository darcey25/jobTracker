import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

class HelpPage extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={6} xsOffset={3}>
            <h1
              style={{
                fontFamily: 'Lobster, cursive',
              }}
              >Help</h1>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at tellus accumsan, bibendum metus eu, molestie eros. Proin quis felis nec neque condimentum cursus non at quam. Nam et dictum lectus, ac dapibus nunc. Nunc vel bibendum eros, sed suscipit elit. Donec at nulla bibendum, elementum velit eu, ullamcorper ipsum. Morbi odio nibh, facilisis at elementum vel, dignissim quis nunc. Phasellus convallis consequat euismod. Ut eu dictum mi. Suspendisse interdum turpis felis, non pharetra arcu efficitur a. Quisque a ex ac ligula dignissim consequat tincidunt eu risus. Curabitur leo leo, rutrum non varius ac, tincidunt eu augue. Praesent lorem magna, tincidunt vel tempor ac, ullamcorper et sapien. Maecenas non libero condimentum, maximus leo at, bibendum purus. Vestibulum luctus mattis risus, sed convallis eros auctor non.
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default (HelpPage);
