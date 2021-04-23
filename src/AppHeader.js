import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppHeader() {
  return (
      <header className="fixed-top AppHeader AppBg2">
        <div className="col-4">Food Stock 0423 0839</div>
        <div className="col-6">
          <div>在庫</div>
          <div>賞味期限</div>
        </div>
        <div className="col-2">再注文</div>
      </header>
  );
}

export default AppHeader;
