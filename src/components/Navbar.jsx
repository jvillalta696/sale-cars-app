import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

const Navbar = ({ setCurrentView }) => {
  const { signout, config, currentCompany, apiConfig } = useAuth();

  useEffect(() => {
    // Initialize Materialize CSS components
    M.AutoInit();
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
  }, []);

  const handleSignOut = async () => {
    try {
      await signout();
      M.toast({ html: 'Usuario cerró sesión con éxito', classes: 'green' });
    } catch (error) {
      M.toast({
        html: `Error al intentar cerrar sesión: ${error.message}`,
        classes: 'red',
      });
    }
  };

  return (
    <>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper  teal lighten-1">
            <a
              href="#"
              className="brand-logo"
              onClick={() => {
                setCurrentView('Welcome');
              }}
            >
             {currentCompany && currentCompany.code && (
              <img
                src={`${apiConfig.URI}/imagen/${currentCompany.code}`}
                alt={`Logo ${currentCompany.name || 'Company'}`}
                style={{
                  height: '56px', // Altura del navbar de Materialize
                  maxWidth: '200px',
                  objectFit: 'contain',
                  marginLeft: '20px',
                  verticalAlign: 'middle'
                }}
                onError={(e) => {
                  // Si la imagen falla al cargar, ocultar el elemento
                  const target = e.target;
                  if (target instanceof HTMLImageElement) {
                    target.style.display = 'none';
                  }
                }}
              />
            )} 
            </a>
            
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <a href="#!" onClick={() => setCurrentView('Clientes')}>
                  Clientes
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  onClick={() => setCurrentView('VehicleMasterData')}
                >
                  Vehiculos
                </a>
              </li>             
              <li>
                <a
                  href="#!"
                  onClick={() => setCurrentView('LoadVehicleContract')}
                >
                  Contratos
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  onClick={() => setCurrentView('ScheduleDeliveries')}
                >
                  Entregas
                </a>
              </li>
              {
                config && config.rol === 'ADM' && (
                  <li>
                    <a href="#!" onClick={() => setCurrentView('Configure')}>
                      Configuración
                    </a>
                  </li>
                )
              }
              <li>
                <a href="#!" onClick={handleSignOut}>
                  Salir
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <Sidebar setCurrentView={setCurrentView} onSignOut={handleSignOut}/>
    </>
  );
};

// Definición de los tipos de propiedades esperadas para el componente Navbar
Navbar.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
};

export default Navbar;
