import React from 'react';
import './Kiji.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="http://www.arsweb.co.jp/">
        ARS CO., LTD.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function AppFooter() {
  return (
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[300],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            勤怠確認画面
          </Typography>
          <Copyright />
        </Container>
      </Box>
  );
  // return (
  //   <footer className="fixed-bottom AppFooter">
  //     <div>AAA</div>
  //     <div>BBB</div>
  //     <div>CCC</div>
  //     <AmplifySignOut  buttonText="Sign Out" className="col-2"/>
  //   </footer>
  // );
}

export default AppFooter;
