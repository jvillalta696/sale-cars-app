import React, { useEffect } from 'react';
import M from 'materialize-css';

const SearchVehicleForm = () => {
    useEffect(() => {
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);        
      }, []);
    return (
        <>
      <div className="card" style={{ padding: '20px', margin: '20px' }}>
        <h6>Buscar Vehículo</h6>
        <div className="row">
          <div className="col s12 m3 input-field">
            <i className="material-icons prefix">directions_car</i>
            <select name='marca' id='marca'>
              <option value="" disabled selected>Seleccione un modelo</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="Nissan">Nissan</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Ford">Ford</option>
            </select>
          </div>
          <div className="col s12 m3 offset-m1 input-field">
            <i className="material-icons prefix">directions_car</i>
            <select name='modelo' id='modelo' >
              <option value="" disabled selected>Seleccione un modelo</option>
              <option value="Corolla">Corolla</option>
              <option value="Yaris">Yaris</option>
              <option value="Civic">Civic</option>
              <option value="Accord">Accord</option>
              <option value="Sentra">Sentra</option>
              <option value="Altima">Altima</option>
              <option value="Accent">Accent</option>
              <option value="Elantra">Elantra</option>
              <option value="Spark">Spark</option>
              <option value="Sonic">Sonic</option>
              <option value="Fiesta">Fiesta</option>
              <option value="Focus">Focus</option>
            </select>
          </div>
          <div className="col s12 m3 offset-m1 input-field">
            <i className="material-icons prefix">palette</i>
            <select name="color" id="color">
              <option value="blanco">Blanco</option>
            </select>
          </div>
          <div className="col s2 m1 input-field right">
            <a className="btn-floating btn-medium waves-effect waves-light teal hoverable"><i className="material-icons">search</i></a>
          </div>
        </div>
      </div>
    </>
    );
};

export default SearchVehicleForm;