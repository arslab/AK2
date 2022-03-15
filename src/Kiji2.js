import React from 'react';
import './Kiji.css';
import Box from '@mui/material/Box';
import AppHeader from './KijiHeader';
import AppFooter from './KijiFooter';
import Kintai from './Kintai';
//import { withAuthenticator } from '@aws-amplify/ui-react';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // return (
  //   <div className="mt-5 mb-5 container-fluid AppBg0">
  //     <AppHeader/>
  //     <Kintai/>
  //     <AppFooter/>
  //   </div>
  // );
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <AppHeader/>
      <Box sx={{ py: 2, flex: 1, backgroundColor: (theme) => theme.palette.grey[100]}}>
        <Kintai/>
      </Box>
      <AppFooter/>
    </Box>
  );
}

export default App;