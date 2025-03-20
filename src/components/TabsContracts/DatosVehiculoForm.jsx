import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import SearchVehicleForm from './SubComponents/SearchVehicleForm.jsx';

const DatosVehiculoForm = ({ formData, setFormData ,setIsLoading, data}) => {
  const [vehicleData, setVehicleData] = useState(formData|| null);

  useEffect(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    M.updateTextFields();
  }, [formData, vehicleData]);

  useEffect(() => {
    if (vehicleData) {      
      setFormData(vehicleData);
      }
  }, [vehicleData]);

  return (
    <>
      <SearchVehicleForm setVehicleData={setVehicleData} setIsLoading={setIsLoading} />
      {!vehicleData? <p>No hay datos a mostrar</p> :
        <div className="card" style={{ padding: 20, margin: 20 }}>
          <div className="row">
            <div className="col s12 m6 offset-m6 input-field">
              <i className='material-icons prefix'>price_change</i>
              <input type="number" name='precio' value={vehicleData?.precio || ''} onChange={(e) => setVehicleData({ ...vehicleData, precio: e.target.value })} />
              <label htmlFor="precio">Precio</label>
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
              <input type="text" value={vehicleData?.Ano || ''} disabled />
              <label htmlFor="ano">Año</label>
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
        </div>
      }
    </>
  );
};

export default DatosVehiculoForm;
