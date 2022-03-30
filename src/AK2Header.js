import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Auth } from "aws-amplify";
import { AmplifySignOut } from '@aws-amplify/ui-react';

function AK2Header(props) {
  var date = new Date().toLocaleString();
  return (
      <AppBar position="static" sx={{color: '#424242', bgcolor: '#ffffff'}}>
        <Toolbar variant="dense">
          <Typography variant="h5" component="div" align="left" sx={{ flexGrow: 6 }}>
            勤怠確認
          </Typography>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            {props.datetime}
          </Typography>
          <Typography component="div" sx={{ flexGrow: 2 }}>
            ログインユーザ:admin
          </Typography>
          {/* <AmplifySignOut  buttonText="ログアウト"/> */}
          <Button component="div" variant="contained" color="secondary" disableElevation onClick={() => Auth.signOut()} sx={{ flexGrow: 1 }}>ログアウト</Button>
        </Toolbar>
      </AppBar>
  );
}
export default AK2Header;
