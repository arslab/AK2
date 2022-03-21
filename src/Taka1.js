import React from 'react'
import { useState } from 'react';                           // state（コンポネント単位のデータ保存機能）
import { useEffect } from 'react';                           // effect (state変化したときの処理機能)
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import {Card, CardHeader, CardContent, CardActions} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

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
    }, 1000);                                  // 1秒ごと
    return () => clearInterval(interval);      // 再描画が終わったらinterval（タイマー）停止
  }, [datetime]);                              // datetimeが更新されたらeffectを実行

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
    //alert(response);
  }

  return (
      <div>
        <AppHeader title="勤怠サマリー" datetime={datetime.toLocaleTimeString()}/>
        <Grid container>
          {employees.map((emp, index) => (
            <Grid item className={classes.grid} key={emp.EmpNo}>
              {emp.Status === '1' ?
                <Card className={classes.card} onClick={() => selectEmp(index)} >
                  <CardHeader title={emp.LastName} className={classes.card_header_1} />
                  <CardContent className={classes.card_content}>
                    出勤
                  </CardContent>
                </Card> 
                :
                <Card className={classes.card} onClick={() => selectEmp(index)} >
                  <CardHeader title={emp.LastName} className={classes.card_header_0} />
                  <CardContent className={classes.card_content}>
                    退勤
                  </CardContent>
                </Card> 
            }
              </Grid>
          ))}
        </Grid>

        <AppFooter/>
      </div>
    )
}

export default Taka1  