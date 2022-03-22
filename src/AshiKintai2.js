import './App.css';
import './Kintai.css';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation,useHistory } from 'react-router-dom'
import { DataGrid,GridToolbarContainer,GridToolbarFilterButton,getGridDateOperators} from '@mui/x-data-grid';

function Kintai() {
  const [items, setItems] = useState([]);
  const location = useLocation()
  const selectedid = location.state.selectedid
  const selectedname = location.state.selectedname

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"UserID": selectedid});
    var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };
    fetch("https://el2gjqf1n3.execute-api.ap-northeast-1.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(async(response) => {
      const apiData = JSON.parse(response);
        setItems(apiData);
      })
    .catch(error => console.log('error', error));
  }

  function createData() {
    var id=0
    var date='';
    var inTime='';
    var outTime='';
    var remarks='';
    var trxCode=''
    var rows=[];
    var count=0;
    items.map(item => {
      date=item.Date;
      remarks=item.Remarks;
      if(item.TrxCode==='IN'){
        inTime=item.Time;
        outTime='';
      }else if(item.TrxCode==='OUT'){
        outTime=item.Time;
        inTime='';
      }else{
        inTime=item.Time;
        outTime=item.Time;
      }
      id=id+1;
      rows.push({id,date,inTime,outTime,remarks});
      // if(item.Date!==date){
      //   if(date!==''){
      //     id=id+1;
      //     rows.push({id,date,inTime,outTime,remarks});
      //   }
      //   date=item.Date;
      //   inTime='';
      //   outTime='';
      //   remarks='';
      // }
      // if(item.TrxCode==='IN'){
      //   inTime=item.Time;
      //   remarks=item.Remarks
      // } else {
      //   outTime=item.Time;
      // }
      // count=count+1;
      // if(count===items.length){
      //   id=id+1;
      //   rows.push({id,date,inTime,outTime,remarks});
      // }
    });
    return rows;
  }
  const rows = createData();

  const filterOperators=
  getGridDateOperators().filter(
    (operator) => operator.value==='is' || operator.value==='onOrAfter' || operator.value==='onOrBefore'
  );

  const columns = [
    { field: 'date', headerName: '日付', type: 'date', filterOperators: filterOperators},
    { field: 'inTime', headerName: '出勤時刻', filterable: false},
    { field: 'outTime', headerName: '退勤時刻', filterable: false},
  ];

  let history = useHistory();
  function handleButton() {
    history.goBack();
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }

  return (
    <Box sx={{ 
      width:'50%',
      mx:'auto',
    }}>
      <Stack spacing={2} direction="row">
        <Button variant="contained" disableElevation onClick={() => {handleButton()}}>戻る</Button>
      </Stack>
      {selectedname}の記録
    <Box 
      sx={{ 
        bgcolor:'#ffffff',
      }}>
      <DataGrid
        autoHeight
        density={'compact'}
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        disableColumnSelector
        disableColumnMenu
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Box>
    </Box>
  );
}

//export default withAuthenticator(Kintai);
export default Kintai;
