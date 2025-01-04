import { useEffect, useState } from 'react';
import mockVehiculos from '../mockData/mockVehiculos.json';
import VehiculoForm from '../components/VehiculoForm';
import M from 'materialize-css';

const ViewVehicleMasterData = () => {
  const [searchVin, setSearchVin] = useState('');
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleSearchVehicle = () => {
    const vehicles = mockVehiculos.filter(v => v.VIN.includes(searchVin));
    setSelectedVehicles(vehicles);
    setSelectedVehicle(null);
  };

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicles([]);
    setSelectedVehicle(vehicle);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchVehicle();
    }
  };

  useEffect(() => {
    M.updateTextFields();
  }, [selectedVehicle]);

  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <span className="card-title">Consulta de Vehiculos por VIN</span>          
          <div className="input-field">
            <input 
              type="text" 
              id="searchVin" 
              placeholder="Digite el VIN a buscar" 
              value={searchVin}
              onChange={(e) => setSearchVin(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <label htmlFor="searchVin">Buscar vehículo</label>
          </div>
          <button onClick={handleSearchVehicle} className="btn">Buscar</button>
          {selectedVehicles.length > 0 && (
            <>
            <div className="h6">Vehículos</div>
            <div className="collection">
              {selectedVehicles.map(vehicle => (
                  <a href="#!" className="collection-item" key={vehicle.VIN} onClick={() => handleSelectVehicle(vehicle)}>
                    {vehicle.VIN} - {vehicle.Marca} {vehicle.Estilo} {vehicle.Año}
                  </a>
                ))}
            </div>                
             </>
          )}           
            
          
        </div>
      </div>
      {selectedVehicle && <VehiculoForm data={selectedVehicle} />}
    </div>
  );
};

export default ViewVehicleMasterData;