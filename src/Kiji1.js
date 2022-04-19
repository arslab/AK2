import React          from 'react'
import { useState }   from 'react';                     // state（コンポネント単位のデータ保存機能）
import { useEffect }  from 'react';                     // effect (state変化したときの処理機能)
import { useHistory } from 'react-router-dom';
import Card        from '@mui/material/Card';
import CardHeader  from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button      from '@mui/material/Button';
import Grid        from '@mui/material/Grid';
import Typography  from '@mui/material/Typography';
import { FaGithub } from "react-icons/fa"
import { FaGithubAlt } from "react-icons/fa"
import { ImHome } from "react-icons/im";
import { ImOffice } from "react-icons/im";


//import AppHeader from './AppHeader';
import AppHeader from './KijiHeader';
import AppFooter from './AppFooter';

const emps = [                                     // 社員出勤状況初期値
  {'EmpNo':'00000', 'FirstName':'---','LastName':'データ取得中', 'status':'0' }
]

function Kiji1() {
  const history = useHistory();
  const [employees, setEmployees] = useState(emps);  
  const [datetime,  setDateTime]  = useState(new Date());  
  const selectEmp = (index) => {
    // 詳細画面へ遷移する。EmpNoを渡す。
    history.push({ pathname: '/Kiji2', state: { EmpNo: employees[index].EmpNo }});  
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

  return (
    <div>
      <AppHeader title="勤怠状況サマリー" datetime={datetime.toLocaleTimeString()}/>
      <Grid container>
        {/* 社員の数だけGridを作成する */}
        {employees.map((emp, index) => (
          <Grid item sx={{}} key={emp.EmpNo}>
            <Card sx={{width:"200px", height:"200px", margin:1}} >
              {/* statusによってCardHeaderの色を変える */}
              {emp.status === '1' ?
              <CardHeader title={emp.LastName} sx={{backgroundColor:"#00DD00",color:"#FFFFFF" }}/> :
              <CardHeader title={emp.LastName} sx={{backgroundColor:"#FF0044",color:"#FFFFFF" }}/> 
              }
              <CardContent sx={{backgroundColor:"#FFFFFF",color:"#444444",fontSize:"20px" }}>
                {/* statusによって出勤/退勤を表示する */}
                {emp.status === '1' ?
                <Typography variant="h5" component="div"><h1 className="text-6xl p-10"><ImOffice /></h1></Typography> 
                :
                <Typography variant="h5" component="div"><h1 className="text-6xl p-10"><ImHome /></h1></Typography>
                }
                {/* 社員データを表示する */}
                <Typography component="div" sx={{color:'text.secondary',fontSize:14, marginTop:1}}>
                  {emp.EmpNo} {emp.LastName} {emp.FirstName}
                </Typography>

              <CardActions>
                <Button size="small" onClick={() => selectEmp(index)}>詳細</Button>
                <Button size="small" onClick={() => createAttendance(index)}>IN/OUT(TEST)</Button>
              </CardActions>


              </CardContent>
            </Card> 
              
          </Grid>
        ))}
      </Grid>

      <AppFooter/>
    </div>
  )
}

export default Kiji1  