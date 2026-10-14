import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const LoginButton = (props) => (
  <FlatButton
    style= {{
      color: 'white',
      marginTop: 'auto',
      marginBottom:'auto',
    }}
    label="Log In"
    onClick={props.onClick} />
);

export default LoginButton;
