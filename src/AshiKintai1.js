import React          from 'react'
import { useState }   from 'react';                     // state（コンポネント単位のデータ保存機能）
import { useEffect }  from 'react';                     // effect (state変化したときの処理機能)
import { useHistory } from 'react-router-dom';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Card        from '@mui/material/Card';
import CardHeader  from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button      from '@mui/material/Button';
import Grid        from '@mui/material/Grid';
import Typography  from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';

const emps = [                                     // 社員出勤状況初期値
  {'EmpNo':'00000', 'FirstName':'---','LastName':'データ取得中', 'status':'0' }
]
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Kintai() {
  const history = useHistory();
  const [employees, setEmployees] = useState(emps);
  const [expanded, setExpanded] = React.useState(false);  
  const [datetime,  setDateTime]  = useState(new Date());  
  const selectEmp = (emp) => {
    // 詳細画面へ遷移する。EmpNoを渡す。
    history.push({ 
      pathname: '/ashi2', 
      state: { 
        selectedid: emp.EmpNo,
        selectedname: emp.LastName+' '+emp.FirstName
      }
    });  
  }  
  useEffect(() => {                            // 描画後の処理。タイマーでデータを定期更新する。
    fetchItems();                              // データを再取得
  //   const interval = setInterval(() => {
  //       setDateTime(new Date());               // datetimeを更新
  //   }, 1000);                                  // ミリ秒ごと
  //   return () => clearInterval(interval);      // 再描画が終わったらinterval（タイマー）停止
  // }, [datetime]);                              // datetimeが更新されたらこの関数(effect)を実行
  }, []);

  // 社員勤怠状態をAPIから取得し、employeesにセットする
  async function fetchItems() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({});
    var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };
    fetch("https://7ydtm36vx3.execute-api.ap-northeast-1.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(async(response) => {
      const apiData = JSON.parse(response);
      setEmployees(apiData);
      console.log(apiData);
    })
    .catch(error => console.log('error', error));
  }

  // 勤怠を記録する（テスト用）
  const createAttendance = (index) => {
    sendAttendance(employees[index].CardID);  // APIをcallする。CardIDを渡す。
  }
  async function sendAttendance(CardID) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"CardID":CardID});
    var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };
    fetch("https://iv822lhlh5.execute-api.ap-northeast-1.amazonaws.com/dev/", requestOptions)
    .then(response => response.text())
    .then(async(response) => {
      const apiData = JSON.parse(response);
      console.log(apiData);
    })
    .catch(error => console.log('error', error));
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{mx:2}}>
      <Grid container>
        {/* 社員の数だけGridを作成する */}
        {employees.map((emp, index) => (
          <Grid item sx={{}} key={emp.EmpNo}>
            <Card sx={{width:"250px", margin:1}} >
            <CardActionArea onClick={() => selectEmp(emp)}>
              {/* statusによってCardHeaderの色を変える */}
              {emp.Status === '1' ?
              <CardHeader title={emp.LastName+' '+emp.FirstName} sx={{backgroundColor:"#4caf50",color:"#FFFFFF" }}/> :
              <CardHeader title={emp.LastName+' '+emp.FirstName} sx={{backgroundColor:"#f44336",color:"#FFFFFF" }}/> 
              }
            </CardActionArea>
              {/* <CardActions>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit> */}
                <CardContent sx={{backgroundColor:"#FFFFFF",color:"#444444",fontSize:"20px" }}>
                  <Typography>{emp.EmpNo}</Typography>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography align="right" pr={2}>IN</Typography>
                      <Typography align="right" pr={2}>OUT</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography align="left"> {emp.InDate} {emp.InTime}</Typography>
                      <Typography align="left"> {emp.OutDate} {emp.OutTime}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              {/* </Collapse> */}
            </Card> 
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Kintai 