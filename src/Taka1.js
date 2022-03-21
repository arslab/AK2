import React from 'react'
import { useState } from 'react';                           // state（コンポネント単位のデータ保存機能）
import { useEffect } from 'react';                           // effect (state変化したときの処理機能)
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import {Card, CardHeader, CardContent, CardActions} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from '@mui/material/Typography';


//import AppHeader from './AppHeader';
import AppHeader from './TakaHeader';
import AppFooter from './AppFooter';

const useStyles = makeStyles((theme) => ({
  typography: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },
  grid: {
    margin: "auto",
  },
  button: {
    marginTop:    theme.spacing(5),
    marginBottom: theme.spacing(5),
    width: "250px",
    height: "200px",
    fontSize: "30px",
    margin: theme.spacing(1),
  },
  card: {
    marginTop:    theme.spacing(5),
    marginBottom: theme.spacing(5),
    width: "250px",
    height: "200px",
    margin: theme.spacing(1),
  },
  card_header_0: {
    fontSize: "50px",
    color:    "#FFFFFF",
    backgroundColor: "#FF0044"
  },
  card_header_1: {
    fontSize: "50px",
    color:    "#FFFFFF",
    backgroundColor: "#00EE00"
  },
  card_content: {
    fontSize: "20px",
    color:    "#444444",
    backgroundColor: "#FFFFFF"
  },
}))
const emps = [                                     // 社員出勤状況初期値
  {'EmpNo':'11111', 'FirstName':'---','LastName':'データ取得中', 'status':'0' }
]

function Taka1() {
  const classes = useStyles();
  const history = useHistory();
  const [employees, setEmployees] = useState(emps);  
  const [datetime,  setDateTime]  = useState(new Date());  
  const selectEmp = (index) => {
    // 詳細画面へ遷移する。EmpNoを渡す。
    history.push({ pathname: '/taka2', state: { EmpNo: employees[index].EmpNo }});  
  }
    
  useEffect(() => {                            // 描画後の処理。タイマーでデータを定期更新する。
    fetchItems();                              // データを再取得
    const interval = setInterval(() => {
        setDateTime(new Date());               // datetimeを更新
    }, 1000);                                  // ミリ秒ごと
    return () => clearInterval(interval);      // 再描画が終わったらinterval（タイマー）停止
  }, [datetime]);                              // datetimeが更新されたらこの関数(effect)を実行

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

  return (
    <div>
      <AppHeader title="勤怠サマリー" datetime={datetime.toLocaleTimeString()}/>
      <Grid container>
        {/* 社員の数だけGridを作成する */}
        {employees.map((emp, index) => (
          <Grid item className={classes.grid} key={emp.EmpNo}>
            <Card className={classes.card} onClick={() => selectEmp(index)} >
              {/* statusによってCardHeaderの色を変える */}
              {emp.Status === '1' ?
              <CardHeader title={emp.LastName} className={classes.card_header_1} /> :
              <CardHeader title={emp.LastName} className={classes.card_header_0} />
              }
              <CardContent className={classes.card_content}>
                {/* statusによって出勤/退勤を表示する */}
                {emp.Status === '1' ?
                <Typography variant="h5" component="div">出勤</Typography> :
                <Typography variant="h5" component="div">退勤</Typography>
                }
                {/* 社員データを表示する */}
                <Typography variant="h8" component="div" sx={{ color: 'text.secondary', fontSize: 16}}>
                  {emp.EmpNo} {emp.LastName} {emp.FirstName}
                </Typography>

              </CardContent>
            </Card> 
              
          </Grid>
        ))}
      </Grid>

      <AppFooter/>
    </div>
  )
}

export default Taka1  