import Navbar from '../components/Navbar';
import React, { useState } from 'react';
import views from '../views';
import GlobalCompanySelect from '../components/GlobalCompanySelect';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('Welcome');

  const renderView = () => {
    const view = views.find((v) => v.name === currentView);
    return view ? (
      <view.component />
    ) : (
      <p>Selecciona una vista desde el menú</p>
    );
  };

  return (
    <div>
      <Navbar setCurrentView={setCurrentView} />
      <div className="row">
        <div className="col s12 m2">
          <GlobalCompanySelect />
        </div>
      </div>
      {renderView()}
    </div>
  );
};

export default Dashboard;
