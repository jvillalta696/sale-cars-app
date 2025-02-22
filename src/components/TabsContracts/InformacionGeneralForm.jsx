import React, { useEffect } from 'react';
import M from 'materialize-css';

const InformacionGeneralForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Initialize Materialize CSS select and character counter
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    M.updateTextFields();
    const textAreas = document.querySelectorAll('textarea#U_Opcion');
    M.CharacterCounter.init(textAreas);
  }, [formData]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Abierto':
        return 'lock_open';
      case 'Cerrado':
        return 'lock';
      case 'Cancelado':
        return 'cancel';
      default:
        return 'help_outline';
    }
  };

  return (
    <div className="card" style={{ padding: '20px', margin: '20px' }}>
      <div className="row">
        <div className="col s12 m3 input-field">
          <i className="material-icons prefix">face</i>
          <input type="text" name='U_CARDCODE' id='U_CARDCODE' />
          <label htmlFor="U_CARDCODE">Código</label>
        </div>
        <div className="col s10 m8 input-field">
          <input type="text" name='U_CARDNAME' id='U_CARDCODE' />
          <label htmlFor="U_CARDNAME">Cliente a facturar</label>
        </div>
        <div className="col s2 m1 input-field">
          <a className="btn-floating btn-medium waves-effect waves-light teal hoverable"><i className="material-icons">search</i></a>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m3 input-field">
          <i className="material-icons prefix">face</i>
          <input type="text" name='U_CARDCODE' id='U_CARDCODE' />
          <label htmlFor="U_CARDCODE">Código</label>
        </div>
        <div className="col s10 m8 input-field">
          <input type="text" name='U_CARDNAME' id='U_CARDCODE' />
          <label htmlFor="U_CARDNAME">Cliente Vehículo</label>
        </div>
        <div className="col s2 m1 input-field">
          <a className="btn-floating btn-medium waves-effect waves-light teal hoverable"><i className="material-icons">search</i></a>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m4 input-field">
          <i className='material-icons prefix'>event</i>
          <input type="date" name="U_DocDate" id="U_DocDate" />
          <label htmlFor="U_DocDate">Fecha de Documento</label>
        </div>
        <div className="col s12 m4 input-field">
          <i className='material-icons prefix'>{getStatusIcon('Abierto')}</i>
          <input type="text" name='U_Estado' id='U_Estado' disabled value={'Abierto'} />
          <label htmlFor="U_Estado">Estado</label>
        </div>
        <div className="col s12 m4 input-field">
          <i className='material-icons prefix'>attach_money</i>
          <select name="U_Moneda" id="U_Moneda">
            <option value="" disabled selected>Seleccione una moneda</option>
            <option value="USD">Dolares</option>
            <option value="COL">Colones</option>
          </select>
        </div>
      </div>
      <div className="row">
      <div className="col s12 m3 input-field">
          <i className="material-icons prefix">badge</i>
          <input type="text" name='U_FooVend' id='U_FooVend' />
          <label htmlFor="U_FooVend">Código</label>
        </div>
        <div className="col s10 m8 input-field">
          <input type="text" name='U_SlpName' id='U_SlpName' />
          <label htmlFor="U_SlpName">Vendedor</label>
        </div>
        <div className="col s2 m1 input-field">
          <a className="btn-floating btn-medium waves-effect waves-light teal hoverable"><i className="material-icons">search</i></a>
        </div>
      </div>
      <div className="row">
        <div className="col s12 input-field" >
        <i className="material-icons prefix">comment</i>
        <textarea id="U_Opcion" name='U_Opcion' className="materialize-textarea" data-length="230"></textarea>
        <label htmlFor="U_Opcion">Comentarios</label>
        </div>
      </div>
    </div>
  );
};

export default InformacionGeneralForm;
