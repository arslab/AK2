import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch} from 'react-router-dom';
//import { Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // 標準スタイルは bootstrapを使う
import './App.css';                            // アプリ共通スタイル（kzXxxxx）
import SummaryPage   from './summarypage';
import DetailPage   from './detailpage';

  class AK2 extends React.Component {

    render(){
      return (
        <div className="App">
          <div>
          
          <Router>   
          {/* <Routes>    */}
          <Switch>
            <Route exact={true} path='/' component={DetailPage}/>
            <Route exact={true} path='/summarypage'  component={SummaryPage}/>    
            <Route exact={true} path='/detailpage'  component={DetailPage}/>    
          </Switch>
          {/* </Routes> */}
          </Router>
          
          </div>      
        {/* <AmplifySignOut /> */}
      </div>
  
    )};
  }  

export default AK2;