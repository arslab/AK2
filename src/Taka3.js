// import React from 'react'
// // import { Component } from 'react';
// // import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能
// // import { useState } from 'react';                           // state（コンポネント単位のデータ保存機能）
// // import { useEffect } from 'react';                           // effect (state変化したときの処理機能)
// // import { useRef } from 'react'; 
// // import { ThemeProvider, createTheme } from '@material-ui/core/styles';
// // import pink from '@material-ui/core/colors/pink';
// // import { Box } from '@material-ui/core';

// import './App.css';      
// import AppHeader from './AppHeader';
// import AppFooter from './AppFooter';
// import KintaiSummary from './KintaiSummary';
// // import { Link, useHistory } from 'react-router-dom';

// class SummaryPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       date: new Date(),
//       choices: ['a','b','c']
//     };
//   }
//   componentDidMount() {
//     this.timerID = setInterval(
//       () => this.tick(),
//       1000
//     );
//   }
//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   }
  
//   tick() {
//     this.setState({
//       date: new Date()
//     });
//   }

//   render(){
//     return (
//       <div>
//         {/* <AppHeader/> */}
//         <div style={{marginTop: 0,marginBottom: 30, color: 'white'}} className="AppBg2">
//           <h2>現時刻 {this.state.date.toLocaleTimeString()}</h2>
//         </div>
//         {/* <KintaiSummary/> */}
//         <AppFooter/>
//       </div>
//     )};
// }

// //export default withRouter(SummaryPage) // 画面遷移対象にするので、withRoute()を使う
// export default SummaryPage  // 画面遷移対象にするので、withRoute()を使う