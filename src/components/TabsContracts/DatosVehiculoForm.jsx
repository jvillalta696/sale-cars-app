import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import SearchVehicleForm from './SubComponents/SearchVehicleForm.jsx';

const DatosVehiculoForm = ({ formData, setFormData, config, db }) => {
  const [vehicleData, setVehicleData] = useState(null);


  useEffect(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    M.updateTextFields();
  }, [formData, vehicleData]);

  useEffect(() => {
    if (vehicleData) {
      console.log(vehicleData);
      setFormData((prevData) => ({
        ...prevData,
        datosVehiculo: vehicleData,
      }));
    }
  }, [vehicleData]);

  return (
    <>
      <SearchVehicleForm config={config} db={db} setVehicleData={setVehicleData} />
      {!vehicleData ? <p>No hay datos a mostrar</p> :
        <div className="card" style={{ padding: 20, margin: 20 }}>
          <div className="row">
            <div className="col s12 m6 offset-m6 input-field">
              <i className='material-icons prefix'>price_change</i>
              <input type="number" name='PRECIO' />
              <label htmlFor="PRECIO">Precio</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Unidad || 'Numero de unidad'} disabled />
              <label htmlFor="UNIDAD">UNIDAD</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Empresa || 'Nombre de la empresa'} disabled />
              <label htmlFor="EMPRESA">EMPRESA</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Tipo || 'Tipo Vehiculo'} disabled />
              <label htmlFor="TIPO">Tipo</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.VIN || 'Tipo Vehiculo'} disabled />
              <label htmlFor="VIN">VIN</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Marca || 'Marca del Vehiculo'} disabled />
              <label htmlFor="MARCA">MARCA</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Modelo || 'Modelo del vehículo'} disabled />
              <label htmlFor="MODELO">MODELO</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Color || 'Color del Vehículo'} disabled />
              <label htmlFor="COLOR">COLOR</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Ano || 'Año del Vehiculo'} disabled />
              <label htmlFor="ANIO">AÑO</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Combustible || 'Combustible del Vehiculo'} disabled />
              <label htmlFor="COMBUSTIBLE">COMBUSTIBLE</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Trasmision || 'Transmisión del vehículo'} disabled />
              <label htmlFor="TRASMISION">TRASMISION</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Ejes || 'Ejes del Vehículo'} disabled />
              <label htmlFor="EJES">EJES</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Traccion || 'Trtacción del Vehiculo'} disabled />
              <label htmlFor="TRACCION">TRACCION</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.DiasInvent || 'Dias Inventario'} disabled />
              <label htmlFor="D_Invetarios">D_Invetarios</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Ubicacion || 'Ubicación del vehículo'} disabled />
              <label htmlFor="TRASMIUBICACIONSION">UBICACION</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Estatus || 'Estatus del Vehículo'} disabled />
              <label htmlFor="ESTATUS">ESTATUS</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Placa || 'Placa del Vehiculo'} disabled />
              <label htmlFor="PLACA">PLACA</label>
            </div>
            <div className="row">
              <div className="col s12 m4 input-field">
                <input type="text" value={vehicleData?.Clase || 'Clase del Vehiculo'} disabled />
                <label htmlFor="CLASE">CLASE</label>
              </div>
            </div>
          </div>
        </div>
      }

    </>
  );
};

export default DatosVehiculoForm;
