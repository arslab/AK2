import './App.css';
import './Kintai.css';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useLocation,useHistory } from 'react-router-dom'
import { DataGrid,GridToolbarContainer,
  GridToolbarFilterButton,
  getGridDateOperators,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';

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
  //データの表示
  function createData() {
    var id=0
    var date='';
    var time='';
    var remarks='';
    var rows=[];
    items.map(item => {
      date=item.Date;
      time=item.Time;
      remarks=item.Remarks;
      id=id+1;
      rows.push({id,date,time,remarks});
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
  //フィルターのカスタマイズ
  const filterOperators=
  getGridDateOperators().filter(
    (operator) => operator.value==='is' || operator.value==='onOrAfter' || operator.value==='onOrBefore'
  );

  const columns = [
    { field: 'date', headerName: '日付', type: 'date', width: 150, filterOperators: filterOperators},
    { field: 'time', headerName: '打刻時刻', width: 150, filterable: false},
    { field: 'remarks', headerName: '備考', flex: 2, minWidth: 100},
  ];
  //戻るボタン
  let history = useHistory();
  function handleButton() {
    history.goBack();
  }
  //ツールバーのカスタマイズ
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }
  //ページ遷移のカスタマイズ
  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
    return (
      <Pagination
        color="secondary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

  return (
    <Box sx={{ 
      width:'50%',
      mx:'auto',
      }}>
      <Stack spacing={2} direction="row">
        <Button variant="contained" color="secondary" disableElevation onClick={() => {handleButton()}}>戻る</Button>
      </Stack>
      <Typography variant="h6">
        {selectedname}の記録
      </Typography>
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
            Pagination: CustomPagination,
          }}
        />
      </Box>
    </Box>
  );
}

//export default withAuthenticator(Kintai);
export default Kintai;
