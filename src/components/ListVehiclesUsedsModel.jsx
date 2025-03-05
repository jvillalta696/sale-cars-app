import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { useVehicle } from '../context/VehicleNewContext';

const ListVehiclesUsedsModel = ({ onSelectVehicle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const { vehiclesUseds } = useVehicle();

  useEffect(() => {
    M.updateTextFields();
    M.Modal.init(document.querySelectorAll('.modal'));
  }, []);

  useEffect(() => {
    if (searchTerm.length > 2) {
      const results = vehiclesUseds.filter(vehicle =>
        vehicle.Caracteristicas.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.Unidad.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVehicles(results);
    } else {
      setFilteredVehicles(vehiclesUseds);
    }
  }, [searchTerm, vehiclesUseds]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectVehicle = (vehicle) => {
    onSelectVehicle(vehicle);
    M.Modal.getInstance(document.getElementById('list-vehicle-modal')).close();
  };

  return (
    <div id="list-vehicle-modal" className="modal">
      <div className="modal-content">
        <h4>Lista de Vehículos Usados</h4>
        <div className="row">
          <div className="col s12 m9 input-field">
            <i className="material-icons prefix">search</i>
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Buscar por Unidad o Características..."
            />
            <label htmlFor="search">Buscar:</label>
          </div>
        </div>
        <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
          <table className="responsive-table highlight">
            <thead>
              <tr>
                <th>Unidad</th>
                <th>Características</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((v) => (
                  <tr key={v.Unidad} onClick={() => handleSelectVehicle(v)}>
                    <td>{v.Unidad}</td>
                    <td>{v.Caracteristicas}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No hay vehículos usados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal-footer">
        <button className="modal-close btn-flat">Cerrar</button>
      </div>
    </div>
  );
};

export default ListVehiclesUsedsModel;
