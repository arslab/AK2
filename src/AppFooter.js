import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AmplifySignOut } from '@aws-amplify/ui-react';

function AppFooter() {
  return (
    <footer className="fixed-bottom AppFooter">
      <div>AAA</div>
      <div>BBB</div>
      <div>CCC</div>
      <AmplifySignOut  buttonText="Sign Out" className="col-2"/>
    </footer>
  );
}

export default AppFooter;
