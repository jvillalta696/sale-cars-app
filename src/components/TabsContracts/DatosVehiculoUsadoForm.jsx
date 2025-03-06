import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import ListVehiclesUsedsModel from '../ListVehiclesUsedsModel';
import { getUsedVehicleData } from '../../services/vehicule.service';
import { useAuth } from '../../context/AuthContext';

const DatosVehiculoUsadoForm = ({ formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);
  const { currentCompany,  apiConfig } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      datosVehiculoUsado: {
        ...prevData.datosVehiculoUsado,
        [name]: value,
      },
    }));
  };

  const handleSelectVehicle = async (vehicle) => {
    setLoading(true);
    try {
      const data = await getUsedVehicleData(apiConfig, currentCompany.code, vehicle.Unidad);
      setVehicleData(data);
      setFormData((prevData) => ({
        ...prevData,
        datosVehiculoUsado: data,
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
                <input type="number" name='PRECIO' onChange={handleChange} />
                <label htmlFor="PRECIO">Precio</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData.Unidad} disabled />
                <label htmlFor="UNIDAD">UNIDAD</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData.Empresa} disabled />
                <label htmlFor="EMPRESA">EMPRESA</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData.Tipo} disabled />
                <label htmlFor="TIPO">Tipo</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData.VIN} disabled />
                <label htmlFor="VIN">VIN</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData.Marca} disabled />
                <label htmlFor="MARCA">MARCA</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData.Modelo} disabled />
                <label htmlFor="MODELO">MODELO</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData.Color} disabled />
                <label htmlFor="COLOR">COLOR</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData.Ano} disabled />
                <label htmlFor="ANIO">AÑO</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData.Combustible} disabled />
                <label htmlFor="COMBUSTIBLE">COMBUSTIBLE</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData.Trasmision} disabled />
                <label htmlFor="TRASMISION">TRASMISION</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData.Ejes} disabled />
                <label htmlFor="EJES">EJES</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData.Traccion} disabled />
                <label htmlFor="TRACCION">TRACCION</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData.DiasInvent} disabled />
                <label htmlFor="D_Invetarios">D_Invetarios</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData.Ubicacion} disabled />
                <label htmlFor="UBICACION">UBICACION</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData.Estatus} disabled />
                <label htmlFor="ESTATUS">ESTATUS</label>
              </div>
              <div className="col s12 m3 input-field">
                <input type="text" value={vehicleData.Placa} disabled />
                <label htmlFor="PLACA">PLACA</label>
              </div>
              <div className="row">
                <div className="col s12 m4 input-field">
                  <input type="text" value={vehicleData.Clase} disabled />
                  <label htmlFor="CLASE">CLASE</label>
                </div>
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
