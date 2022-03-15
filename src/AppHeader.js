import React from 'react';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

//import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import IconButton from '@mui/material/IconButton';
//import MenuIcon from '@mui/icons-material/Menu';
import { AmplifySignOut } from '@aws-amplify/ui-react';

function AppHeader() {
  // return (
  //     <header className="fixed-top AppHeader AppBg2">
  //       <div className="col-4">ARS Kintai2</div>
  //       <div className="col-6">
  //         <div>XXXX</div>
  //         <div>YYYY</div>
  //       </div>
  //       <div className="col-2">ZZZZ</div>
  //     </header>
  // );
  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            勤怠
          </Typography>
          <AmplifySignOut  buttonText="ログアウト"/>
        </Toolbar>
      </AppBar>
  );
}

export default AppHeader;
