import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import ListVehiclesUsedsModel from '../ListVehiclesUsedsModel';
import { getUsedVehicleData } from '../../services/vehicule.service';
import { useAuth } from '../../context/AuthContext';

const DatosVehiculoUsadoForm = ({ formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState(formData);
  const { currentCompany, apiConfig } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      vehiculoUsadoxContrato: [
        {
          ...prevData.vehiculoUsadoxContrato[0],
          [name]: value,
        }
      ]
    }));
  };

  const handleSelectVehicle = async (vehicle) => {
    setLoading(true);
    try {
      const data = await getUsedVehicleData(apiConfig, currentCompany.code, vehicle.Unidad);
      setVehicleData(data);
      setFormData((prevData) => ({
        ...prevData,
        vehiculoUsadoxContrato: [data],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    M.updateTextFields();
  }, [formData]);

  return (
    <>
      <div className="card" style={{ padding: 20, margin: 20 }}>
        <button data-target="list-vehicle-modal" className="btn modal-trigger">
          <i className='material-icons left'>search</i>Lista de Usados
        </button>
        {loading ? (
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        ) : vehicleData ? (
          <>
            <div className="row">
              <div className="col s12 m6 offset-m6 input-field">
                <i className='material-icons prefix'>price_change</i>
                <input type="number" name='precioRecibo' value={vehicleData?.PrecioRecibo || ''} onChange={handleChange} />
                <label htmlFor="precioRecibo">Precio</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData?.Unidad || ''} disabled />
                <label htmlFor="unidad">Unidad</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData?.Marca || ''} disabled />
                <label htmlFor="marca">Marca</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData?.Modelo || ''} disabled />
                <label htmlFor="modelo">Modelo</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData?.Color || ''} disabled />
                <label htmlFor="color">Color</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData?.Anio || ''} disabled />
                <label htmlFor="anio">Año</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData?.VIN || ''} disabled />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData?.Trasmision || ''} disabled />
                <label htmlFor="trasmision">Transmisión</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData?.Combustible || ''} disabled />
                <label htmlFor="combustible">Combustible</label>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <ListVehiclesUsedsModel onSelectVehicle={handleSelectVehicle} />
    </>
  );
};

export default DatosVehiculoUsadoForm;
