import { useEffect } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';

const Sidebar = ({ setCurrentView }) => {
  useEffect(() => {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
  }, []);

  return (
    <ul id="mobile-demo" className="sidenav">
      <li><a href="#!" className='sidenav-close' onClick={() => setCurrentView('Clientes')}>Clientes</a></li>
      <li><a href="#!" className='sidenav-close' onClick={() => setCurrentView('VehicleMasterData')}>Vehiculos</a></li>
      <li><a href="#!" className='sidenav-close' onClick={() => setCurrentView('ContractSales')}>Contratos</a></li>
      <li><a href="#!" className='sidenav-close' onClick={() => setCurrentView('LoadVehicleContract')}>Vehiculos/Contrato</a></li>
      <li><a href="#!" className='sidenav-close' onClick={() => setCurrentView('ScheduleDeliveries')}>Entregas</a></li>
    </ul>
  );
};

Sidebar.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
};

export default Sidebar;