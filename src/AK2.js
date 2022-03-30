import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch} from 'react-router-dom';
//import { Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // 標準スタイルは bootstrapを使う
import './App.css';                            // アプリ共通スタイル（kzXxxxx）
import Taka1   from './Taka1';
import Taka2   from './Taka2';
import Kiji1   from './Kiji1';
import Kiji2   from './Kiji2';
import Naka1   from './Naka1';
import Naka2   from './Naka2';
import Ashi1   from './Ashi1';
import Ashi2   from './Ashi2';
import App     from './App';
import AK2Home     from './AK2Home';
import AK2List     from './AK2List';
import AK2Detail     from './AK2Detail';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#424242',
    },
    secondary: {
      main: '#ff643c',
      contrastText: '#ffffff'
    },
  },
});

  class AK2 extends React.Component {

    render(){
      return (
        <ThemeProvider theme={theme}>
        <div className="App">
          <div>
          
          <Router>   
          {/* <Routes>    */}
          <Switch>
            <Route exact={true} path='/' component={AK2Home}/>
            <Route exact={true} path='/AK2List' component={AK2List}/>
            <Route exact={true} path='/AK2Detail' component={AK2Detail}/>
            <Route exact={true} path='/taka1'  component={Taka1}/>    
            <Route exact={true} path='/taka2'  component={Taka2}/>    
            <Route exact={true} path='/ashi1'  component={Ashi1}/>    
            <Route exact={true} path='/ashi2'  component={Ashi2}/>    
            <Route exact={true} path='/kiji1'  component={Kiji1}/>    
            <Route exact={true} path='/kiji2'  component={Kiji2}/>    
            <Route exact={true} path='/naka1'  component={Naka1}/>    
            <Route exact={true} path='/naka2'  component={Naka2}/>    
          </Switch>
          {/* </Routes> */}
          </Router>
          
          </div>      
        {/* <AmplifySignOut /> */}
      </div>
      </ThemeProvider>
    )};
  }  

export default AK2;