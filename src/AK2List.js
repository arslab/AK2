import './App.css';
import './Kintai.css';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid,GridToolbarContainer,GridToolbarFilterButton, getGridStringOperators } from '@mui/x-data-grid';
import { useHistory } from 'react-router-dom';
import AK2Header from './AK2Header';
import AK2Footer from './AK2Footer';
import Link from '@mui/material/Link';
import Grid        from '@mui/material/Grid';

function AK2List() {
  const [rows, setRows] = useState([]);
  var date = new Date().toLocaleString();
  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({});
    var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };
    fetch("https://7ydtm36vx3.execute-api.ap-northeast-1.amazonaws.com/dev/", requestOptions)
    .then(response => response.text())
    .then(async(response) => {
      const apiData = JSON.parse(response);
      setRows(apiData);
      })
    .catch(error => console.log('error', error));
  }
  //フィルターのカスタマイズ
  const filterOperators=
    getGridStringOperators().filter(
      (operator) => operator.value ==='contains'
    );

  const columns = [
    { field: 'Group', headerName: 'グループ', filterOperators: filterOperators},
    { field: 'EmpNo', headerName: '従業員番号', filterOperators: filterOperators},
    { field: 'FullName', headerName: '名前', valueGetter: getFullName, width: 150, filterOperators: filterOperators},
    { field: 'In', headerName: '最終出勤', valueGetter: getIn, width: 150, filterable: false},
    { field: 'Our', headerName: '最終退勤', valueGetter: getOut, width: 150, filterable: false},
    { field: 'StatusDesc', headerName: '状況', valueGetter: getStatus, type: 'singleSelect', valueOptions: ['不在', '出勤', '在宅']},
  ];
  //フルネームで表示  
  function getFullName(params) {
    return `${params.row.LastName || ''} ${params.row.FirstName || ''}`;
  }
  //出勤日時を表示
  function getIn(params) {
    return `${params.row.InDate || ''} ${params.row.InTime || ''}`;
  }
  //退勤日時を表示
  function getOut(params) {
    return `${params.row.OutDate || ''} ${params.row.OutTime || ''}`;
  }
  //ステータスの値によって表示を変える
  function getStatus(params){
    var statusdesc=''
    if(params.row.Status==='0'){
      statusdesc='不在'
    }else if(params.row.Status==='1'){
      statusdesc='出勤'
    }else if(params.row.Status==='2'){
      statusdesc='在宅'
    }
    return statusdesc
  }
  //ページ遷移
  let history = useHistory();
  function handleClick(params) {
    history.push({
      pathname: './AK2Detail',
      state: { 
        selectedid: params.id,
        selectedname: params.row.LastName+' '+params.row.FirstName
      }
    });
  }
  //ツールバーのカスタマイズ
  function CustomToolbar(){
    return(
      <GridToolbarContainer>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <AK2Header/>
      <Box sx={{ py: 2, flex: 1, backgroundColor: (theme) => theme.palette.grey[100]}}>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Link href="./">Cardはこちら</Link>
            </Grid>
          </Grid>
          <Typography variant="h6">
            出勤状況
          </Typography>
          <Box 
            sx={{ 
              width:'60%',
              mx:'auto',
              bgcolor: '#ffffff',
              '& .super-app-theme--0': {
                bgcolor: '#ffffff',
                '&:hover': {
                  bgcolor: '#eeeeee'
                }
              },
              '& .super-app-theme--1': {
                bgcolor: '#3cd278',
              },
              '& .super-app-theme--2': {
                bgcolor: '#ffb74d',
                '&:hover': {
                  bgcolor: '#ffa726'
                }
              },
          }}>
            <DataGrid
              autoHeight
              rows={rows}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20]}
              getRowId={(row) => row.EmpNo}
              disableColumnSelector
              disableColumnMenu
              components={{
                Toolbar: CustomToolbar,
              }}
              onCellClick={(params,event,details)=>{handleClick(params);}}
              getRowClassName={(params) => `super-app-theme--${params.row.Status}`}
            />
          </Box>
        </Box>
      </Box>
      <AK2Footer/>
    </Box>
  );
}
export default AK2List;
