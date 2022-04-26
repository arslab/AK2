import React          from 'react'
import { useState }   from 'react';                     // state（コンポネント単位のデータ保存機能）
import { useEffect }  from 'react';                     // effect (state変化したときの処理機能)
import { useHistory } from 'react-router-dom';          // react
import { CardActionArea, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card        from '@mui/material/Card';
import CardHeader  from '@mui/material/CardHeader';
import Grid        from '@mui/material/Grid';
import TextField      from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AK2Header from './AK2Header';
import AK2Footer from './AK2Footer';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import { ImHome } from "react-icons/im";
import { ImOffice } from "react-icons/im";


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

function AK2Home() {
  const history = useHistory();
  const [employees, setEmployees] = useState(emps); 
  const [datetime,  setDateTime]  = useState(new Date()); 
  const [showEmployees, setShowEmployees] = useState(employees)
  const [input, setInput] = useState()

  const selectEmp = (emp) => {
    // 詳細画面へ遷移する。EmpNo、名前を渡す。
    history.push({ 
      pathname: '/AK2Detail', 
      state: { 
        selectedid: emp.EmpNo,
        selectedname: emp.LastName+' '+emp.FirstName
      }
    });  
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
      setShowEmployees(employees);
      search(input)
      console.log(apiData);
    })
    .catch(error => console.log('error', error));
  }

  // 検索欄への入力値をハンドリング
  const handleChange = (event) => {
    setInput(event.target.value)
    search(event.target.value)
  }

  // 検索欄への入力値での絞り込み
  const search = (value) => {
    // 検索欄への入力が空の場合はreturn
    if (value === "") {
      setShowEmployees(employees);
      return;
    }

    const serchedEmployees = employees.filter(
      (employees) =>
        Object.values(employees).filter(
          (item) =>
            item !== undefined &&
            item !== null &&
            item.toUpperCase().indexOf(value.toUpperCase()) !== -1
        ).length > 0
    );
    setShowEmployees(serchedEmployees);
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
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <AK2Header  datetime={datetime.toLocaleTimeString()}/>
        <Box sx={{ py: 2, flex: 1, backgroundColor: (theme) => theme.palette.grey[100]}}>
          <Box sx={{mx:2}}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField id="input" label="検索" value={input} size="small" sx={{backgroundColor:'white'}} onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined" 
                />
              </Grid>

              <Grid item xs={6}/>
              
              <Grid item xs={3}>
                <Link href="./AK2List">List表示</Link>
              </Grid>


            </Grid>
            <Grid container>
              {/* 社員の数だけGridを作成する */}
              {showEmployees.map((emp, index) => (
                <Grid item sx={{}} key={emp.EmpNo}>
                  <Card sx={{width:"200px", margin:1}} >

                  <CardActionArea onClick={() => selectEmp(emp)}>
                    {/* statusによってCardHeaderの色を変える */}
                    {emp.Status === '1' ?
                    <CardHeader title={emp.LastName+' '+emp.FirstName} titleTypographyProps={{variant:"h6"}} sx={{backgroundColor:(theme)=>theme.palette.secondary.main,color:"#FFFFFF" }}/>
                    :
                    <CardHeader title={emp.LastName+' '+emp.FirstName} titleTypographyProps={{variant:"h6"}} sx={{backgroundColor:"#90a4ae",color:"#FFFFFF" }}/> 
                 }
                    {emp.Status === '1' ?
                    <Typography variant="h5" component="div"><h1 className="text-6xl p-10"><ImOffice /></h1></Typography> 
                    :
                    <Typography variant="h5" component="div"><h1 className="text-6xl p-10"><ImHome /></h1></Typography> 
                    }
                  </CardActionArea>
                  </Card> 
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <AK2Footer/>
      </Box>
  )
}

export default AK2Home