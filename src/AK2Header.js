import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Auth } from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import logo from './arslogo.png';

function AK2Header(props) {
  var date = new Date().toLocaleString();
  return (
      <AppBar position="static" sx={{color: '#424242', bgcolor: '#ffffff'}}>
        <Toolbar variant="dense">
          <Typography variant="h5" component="div" align="left" sx={{ flexGrow: 6 }} padding={2}>
            <img src={logo} alt="アルス株式会社"></img>
          </Typography>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            {props.datetime}
          </Typography>
          <Typography component="div" sx={{ flexGrow: 2 }}>
            ログインユーザ:admin
          </Typography>

          <AmplifySignOut buttonText="ログアウト"/>

          {/* <Button component="div" variant="contained" color="secondary" disableElevation onClick={() => Auth.signOut()} sx={{ flexGrow: 1 }}>ログアウト３</Button> */}

        </Toolbar>
      </AppBar>
  );
}
export default AK2Header;
