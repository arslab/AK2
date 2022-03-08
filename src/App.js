import React from 'react';
import './App.css';
import AppFooter from './AppFooter';
import AlStock from './AlStock';
import { withAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="mt-5 mb-5 container-fluid AppBg0">
      <AlStock/>
      <AppFooter/>
    </div>
  );
}

export default App;