import Navbar from "../components/Navbar";
import { useState } from 'react';
import views from '../views';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('Welcome');

  const renderView = () => {
    const view = views.find(v => v.name === currentView);
    return view ? <view.component /> : <p>Selecciona una vista desde el menú</p>;
  };

  return (
    <div>
      <Navbar setCurrentView={setCurrentView} />
      {renderView()}
    </div>
  );
};

export default Dashboard;