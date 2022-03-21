import React from 'react';
import Box from '@mui/material/Box';
import AppHeader from './TakaHeader';
import AppFooter from './AppFooter';
import Kintai    from './TakaKintai';

function Taka2(props) {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <AppHeader title="個人勤怠記録"/>
      <Box sx={{ py: 2, flex: 1, backgroundColor: (theme) => theme.palette.grey[100]}}>
        <Kintai EmpNo={props.location.state.EmpNo}/>
      </Box>
      <AppFooter/>
    </Box>
  );
}

export default Taka2;