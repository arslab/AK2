import React from 'react'
import './App.css';                  
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Kintai from './Kintai';
// import { Component } from 'react';
// import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能
// import { useState } from 'react';                           // state（コンポネント単位のデータ保存機能）
// import { useEffect } from 'react';                           // effect (state変化したときの処理機能)
// import { useRef } from 'react'; 
// import { ThemeProvider, createTheme } from '@material-ui/core/styles';
// import pink from '@material-ui/core/colors/pink';
// import { Box } from '@material-ui/core';
// import { Link, useHistory } from 'react-router-dom';

class DetailPage extends React.Component {
  render(){
    return (
        <div className="mt-5 mb-5 container-fluid AppBg1">
        <AppHeader/>
        <Kintai/>
        <AppFooter/>
        </div>
    )};
}

export default DetailPage  