import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import { useAuth } from '../context/AuthContext.jsx';

const Sidebar = ({ setCurrentView, onSignOut }) => {
  const { signout, config } = useAuth();
  useEffect(() => {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
  }, []);

  return (
    <ul id="mobile-demo" className="sidenav">
      <li><a href="#!" className='sidenav-close' onClick={() => setCurrentView('Clientes')}>Clientes</a></li>
      <li><a href="#!" className='sidenav-close' onClick={() => setCurrentView('VehicleMasterData')}>Vehiculos</a></li>
      <li>
        <a
          href="#!"
          className='sidenav-close'
          onClick={() => setCurrentView('LoadVehicleContract')}
        >
          Contratos
        </a>
      </li>
      {
        config && config.rol === 'ADM' && (
          <li>
            <a href="#!" className='sidenav-close' onClick={() => setCurrentView('Configure')}>
              Configuración
            </a>
          </li>
        )
      }
      <li><a href="#!" className='sidenav-close' onClick={() => setCurrentView('ScheduleDeliveries')}>Entregas</a></li>
      <li>
        <a href="#!" onClick={onSignOut} className='sidenav-close'>
          <i className="material-icons left">exit_to_app</i>
          <span className="hide-on-small-only">Salir</span>

        </a>
      </li>
    </ul>
  );
};

Sidebar.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
};

export default Sidebar;