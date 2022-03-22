import './App.css';
import './Kintai.css';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid,GridToolbarContainer,GridToolbarFilterButton, getGridStringOperators } from '@mui/x-data-grid';
import { useHistory } from 'react-router-dom';

function Kintai() {
  const [rows, setRows] = useState([]);
  var date = new Date().toLocaleString();
  var test = 'test'
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
    { field: 'EmpNo', headerName: '従業員番号', filterOperators: filterOperators},
    { field: 'FullName', headerName: '名前', valueGetter: getFullName, filterOperators: filterOperators},
    { field: 'StatusDesc', headerName: '状況', valueGetter: getStatus, type: 'singleSelect', valueOptions: ['不在', '出勤', '在宅']},
  ];
  //フルネームで表示  
  function getFullName(params) {
    return `${params.row.LastName || ''} ${params.row.FirstName || ''}`;
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
      pathname: './ashi2',
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
    <Box>
    <Typography variant="h6">
      出勤状況（{date}時点）
    </Typography>
      <Box 
        sx={{ 
          width:'50%',
          mx:'auto',
          bgcolor: '#ffffff',
          '& .super-app-theme--0': {
            bgcolor: '#ffffff',
            '&:hover': {
              bgcolor: '#eeeeee'
            }
          },
          '& .super-app-theme--1': {
            bgcolor: '#66bb6a',
            '&:hover': {
              bgcolor: '#4caf50'
            }
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
  );
}

//export default withAuthenticator(Kintai);
export default Kintai;
