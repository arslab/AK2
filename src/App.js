import React from 'react';
import './App.css';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Kintai from './Kintai';
import { withAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="mt-5 mb-5 container-fluid AppBg0">
      <AppHeader/>
      <Kintai/>
      <AppFooter/>
    </div>
  );
}

export default App;