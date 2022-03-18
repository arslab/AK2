import React from 'react'
import { useState } from 'react';                           // state（コンポネント単位のデータ保存機能）
import { useEffect } from 'react';                           // effect (state変化したときの処理機能)
import { Box } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import './App.css';      
import AppHeader from './AppHeader';
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
}))
const emps = [
  {'EmpNo':'11111', 'FirstName':'aaa','LastName':'AAA', 'status':'0' },
  {'EmpNo':'22222', 'FirstName':'bbb','LastName':'BBB', 'status':'1' }
]

const selectEmp = (index) => {
  console.log("select"+index+emps[index].name);
}

function Taka1() {
  const classes = useStyles();
  const [employees, setEmployees] = useState(emps);  
  
  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({});
    var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };
    fetch("https://7ydtm36vx3.execute-api.ap-northeast-1.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(async(response) => {
      const apiData = JSON.parse(response);
        //setItems(apiData);
        setEmployees(apiData);
        console.log(apiData);
      })
    .catch(error => console.log('error', error));
    //alert(response);
  }

  return (
      <div>
        <AppHeader/>

        <Grid container>
          {employees.map((emp, index) => (
            <Grid item className={classes.grid} key={emp.EmpNo}>
              {emp.Status === '1' ?
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => selectEmp(index)}
                >
                  <Box>{emp.LastName} {emp.FirstName}</Box>
                  <Box>{": " + emp.Status}</Box>
                </Button> 
                :
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={() => selectEmp(index)}
                >
                <Box>{emp.LastName} {emp.FirstName}</Box>
                <Box>{": " + emp.Status}</Box>
              </Button> 
            }
              </Grid>
          ))}
        </Grid>

        <AppFooter/>
      </div>
    )
}

export default Taka1  // 画面遷移対象にするので、withRoute()を使う