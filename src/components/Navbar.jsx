import { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import { MockAuthContext } from '../context/MockAuthContext';
import Sidebar from './Sidebar';

const Navbar = ({ setCurrentView }) => {
  const { signOutUser } = useContext(MockAuthContext);

  useEffect(() => {
    // Initialize Materialize CSS components
    M.AutoInit();
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      M.toast({ html: 'Usuario cerró sesión con éxito', classes: 'green' });
    } catch (error) {
      M.toast({ html: `Error al intentar cerrar sesión: ${error.message}`, classes: 'red' });
    }
  };

  return (
    <><div className="navbar-fixed">
            <nav>
        <div className="nav-wrapper  teal lighten-1">
          <a href='#' className="brand-logo" onClick={()=>{setCurrentView('Welcome')}}>SaleCars</a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li><a href="#!" onClick={() => setCurrentView('Clientes')}>Clientes</a></li>
            <li><a href="#!" onClick={() => setCurrentView('VehicleMasterData')}>Vehiculos</a></li>
            <li><a href="#!" onClick={() => setCurrentView('ContractSales')}>Contratos</a></li>
            <li><a href="#!" onClick={() => setCurrentView('LoadVehicleContract')}>Vehiculos/Contrato</a></li>
            <li><a href="#!" onClick={() => setCurrentView('ScheduleDeliveries')}>Entregas</a></li>
            <li><a href="#!" onClick={() => setCurrentView('Configure')}>Configuración</a></li>
            <li><a href="#!" onClick={handleSignOut}>Salir</a></li>
          </ul>
        </div>
      </nav>
    </div>
      <Sidebar setCurrentView={setCurrentView} />
    </>
  );
};

// Definición de los tipos de propiedades esperadas para el componente Navbar
Navbar.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
};

export default Navbar;