import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Kintai from './AshiKintai1';
//import { withAuthenticator } from '@aws-amplify/ui-react';

//一覧ページ
function Ashi1() {
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

export default Ashi1;