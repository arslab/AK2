import React from 'react';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

//import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
//import IconButton from '@mui/material/IconButton';
//import MenuIcon from '@mui/icons-material/Menu';
import { Auth } from "aws-amplify";
import { AmplifySignOut } from '@aws-amplify/ui-react';

function AshiHeader() {
  var date = new Date().toLocaleString();
  return (
      <AppBar position="static" sx={{color: '#424242', bgcolor: '#ffffff'}}>
        <Toolbar variant="dense">
          <Typography variant="h5" component="div" align="left" sx={{ flexGrow: 6 }}>
            勤怠確認
          </Typography>
          <Typography component="div" sx={{ flexGrow: 2 }}>
            最終更新日時:{date}
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
export default AshiHeader;
