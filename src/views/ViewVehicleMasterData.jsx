import React, { useEffect, useState } from 'react';
import VehiculoForm from '../components/VehiculoForm';
import M from 'materialize-css';
import { useAuth } from '../context/AuthContext';
import {
  getVehiculeByVIN,
  getVehiculesList,
} from '../services/vehicule.service';
import { useClient } from '../context/ClientContext';

const ViewVehicleMasterData = () => {
  const [searchVin, setSearchVin] = useState('');
  const { apiConfig, currentCompany } = useAuth();
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const { loading } = useClient();

  const handleSearchVehicle = async () => {
    const vehicles = await getVehiculesList(
      apiConfig,
      currentCompany.code,
      searchVin
    );
    setSelectedVehicles(vehicles);
    setSelectedVehicle(null);
  };

  const handleSelectVehicle = async (VIN) => {
    try {
      const vehicleData = await getVehiculeByVIN(
        apiConfig,
        currentCompany.code,
        VIN
      );
      setSelectedVehicles([]);
      console.log(vehicleData.Vehiculo);
      setSelectedVehicle(vehicleData.Vehiculo);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchVehicle();
    }
  };

  useEffect(() => {
    M.updateTextFields();
  }, [selectedVehicle]);

  useEffect(() => {
    if (loading) {
      setSelectedVehicles([]);
      setSelectedVehicle(null);
      setSearchVin('');
    }
  }, [loading]);

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
          <button onClick={handleSearchVehicle} className="btn">
            Buscar
          </button>
          {selectedVehicles.length > 0 && (
            <>
              <div className="h6">Vehículos</div>
              <div className="collection">
                {selectedVehicles.map((vehicle) => (
                  <a
                    href="#!"
                    className="collection-item"
                    key={vehicle.VIN}
                    onClick={() => handleSelectVehicle(vehicle.VIN)}
                  >
                    {vehicle.VIN} - {vehicle.Marca} {vehicle.Estilo}{' '}
                    {vehicle.ColorVehiculo} {vehicle.Año}
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
