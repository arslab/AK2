import React from 'react';
import { useHistory } from 'react-router-dom';

import AppBar     from '@mui/material/AppBar';
import Toolbar    from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon   from '@mui/icons-material/Home';
import { AmplifySignOut } from '@aws-amplify/ui-react';

function AppHeader(props) {
  const history = useHistory();
  const clickHome = (index) => {
    history.push({ pathname: '/Kiji1'});  
  }

  return (
      <AppBar position="static">
        <Toolbar>
          <IconButton type="button" sx={{ p: props.padding }} aria-label="home" onClick={clickHome}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.datetime}
          </Typography>
          <AmplifySignOut  buttonText="ログアウト"/>
        </Toolbar>
      </AppBar>
  );
}

export default AppHeader;
