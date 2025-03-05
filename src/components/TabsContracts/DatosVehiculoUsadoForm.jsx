import React, { useEffect } from 'react';
import M from 'materialize-css';
import ListVehiclesUsedsModel from '../ListVehiclesUsedsModel';

const DatosVehiculoUsadoForm = ({ formData, setFormData }) => {
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

  useEffect(() => {
    M.updateTextFields();
  }, [formData]);

  return (
    <>
    <div className="card" style={{ padding: 20, margin: 20 }}>
    <button data-target="list-vehicle-modal" className="btn modal-trigger"><i className='material-icons left'>search</i>Lista de Usados</button>
        <div className="row">
          <div className="col s12 m6 offset-m6 input-field">
            <i className='material-icons prefix'>price_change</i>
            <input type="number" name='PRECIO' />
            <label htmlFor="PRECIO">Precio</label>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m3 input-field">
            <input type="text" value={'Numero de unidad'} disabled />
            <label htmlFor="UNIDAD">UNIDAD</label>
          </div>
          <div className="col s12 m3 input-field">
            <input type="text" value={'Nombre de la empresa'} disabled />
            <label htmlFor="EMPRESA">EMPRESA</label>
          </div>
          <div className="col s12 m3 input-field">
            <input type="text" value={'Tipo Vehiculo'} disabled />
            <label htmlFor="TIPO">Tipo</label>
          </div>
          <div className="col s12 m3 input-field">
            <input type="text" value={'Tipo Vehiculo'} disabled />
            <label htmlFor="VIN">VIN</label>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m3 input-field">
            <input type="text" value={'Marca del Vehiculo'} disabled />
            <label htmlFor="MARCA">MARCA</label>
          </div>
          <div className="col s12 m3 input-field">
            <input type="text" value={'Modelo del vehículo'} disabled />
            <label htmlFor="MODELO">MODELO</label>
          </div>
          <div className="col s12 m3 input-field">
            <input type="text" value={'Color del Vehículo'} disabled />
            <label htmlFor="COLOR">COLOR</label>
          </div>
          <div className="col s12 m3 input-field">
            <input type="text" value={'Año del Vehiculo'} disabled />
            <label htmlFor="ANIO">AÑO</label>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m3 input-field">
            <input type="text" value={'Combustible del Vehiculo'} disabled />
            <label htmlFor="COMBUSTIBLE">COMBUSTIBLE</label>
          </div>
          <div className="col s12 m3 input-field">
            <input type="text" value={'Transmisión del vehículo'} disabled />
            <label htmlFor="TRASMISION">TRASMISION</label>
          </div>
          <div className="col s12 m3 input-field">
            <input type="text" value={'Ejes del Vehículo'} disabled />
            <label htmlFor="EJES">EJES</label>
          </div>
          <div className="col s12 m3 input-field">
            <input type="text" value={'Trtacción del Vehiculo'} disabled />
            <label htmlFor="TRACCION">TRACCION</label>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m3 input-field">
            <input type="text" value={'Dias Inventario'} disabled />
            <label htmlFor="D_Invetarios">D_Invetarios</label>
          </div>
          <div className="col s12 m3 input-field">
            <input type="text" value={'Ubicación del vehículo'} disabled />
            <label htmlFor="TRASMIUBICACIONSION">UBICACION</label>
          </div>
          <div className="col s12 m3 input-field">
            <input type="text" value={'Estatus del Vehículo'} disabled />
            <label htmlFor="ESTATUS">ESTATUS</label>
          </div>
          <div className="col s12 m3 input-field">
            <input type="text" value={'Placa del Vehiculo'} disabled />
            <label htmlFor="PLACA">PLACA</label>
          </div>
          <div className="row">
            <div className="col s12 m4 input-field">
            <input type="text" value={'Clase del Vehiculo'} disabled />
            <label htmlFor="CLASE">CLASE</label>
            </div>
          </div>
        </div>
      </div>
      <ListVehiclesUsedsModel />
    </>
  );
};

export default DatosVehiculoUsadoForm;
