import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import ListClientModal from '../ListClientModal';
import ListSellersModal from '../ListSellersModal';

const InformacionGeneralForm = ({ formData, setFormData, setCurrentView }) => {
  const [type, setType] = useState(null);
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

  const handleSelectClient = (client) => {
    if (client.type === 'CF') {
      setFormData((prevData) => ({
        ...prevData,
        U_CARDCODE: client.CardCode,
        U_CARDNAME: client.CardName,
      }));
    }
    if (client.type === 'CV') {
      setFormData((prevData) => ({
        ...prevData,
        U_CARDCODE_V: client.CardCode,
        U_CARDNAME_V: client.CardName,
      }));
    }
    setType(null);
  };

  const handleSelectSeller = (seller) => {
    setFormData((prevData) => ({
      ...prevData,
      U_FooVend: seller.SlpCode,
      U_SlpName: seller.SlpName,
    }));
  };

  const handleAddClient = () => {
    setCurrentView('Clientes');
    M.Modal.getInstance(document.getElementById('list-client-modal')).close();
  };

  return (
    <div className="card" style={{ padding: '20px', margin: '20px' }}>
      <div className="row">
        <div className="col s12 m3 input-field">
          <i className="material-icons prefix">face</i>
          <input type="text" disabled name='U_CARDCODE' id='U_CARDCODE' value={formData.U_CARDCODE} onChange={handleChange} />
          <label htmlFor="U_CARDCODE">Código</label>
        </div>
        <div className="col s10 m8 input-field">
          <input type="text" disabled name='U_CARDNAME' id='U_CARDNAME' value={formData.U_CARDNAME} onChange={handleChange} />
          <label htmlFor="U_CARDNAME">Cliente a facturar</label>
        </div>
        <div className="col s2 m1 input-field">
          <a className="btn-floating btn-medium waves-effect waves-light teal hoverable modal-trigger"
            href="#list-client-modal"
            onClick={() => setType('CF')}>
            <i className="material-icons">search</i>
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m3 input-field">
          <i className="material-icons prefix">face</i>
          <input type="text" disabled name='U_CARDCODE_V' id='U_CARDCODE_V' value={formData.U_CARDCODE_V} onChange={handleChange} />
          <label htmlFor="U_CARDCODE_V">Código</label>
        </div>
        <div className="col s10 m8 input-field">
          <input type="text" disabled name='U_CARDNAME_V' id='U_CARDNAME_V' value={formData.U_CARDNAME_V} onChange={handleChange}/>
          <label htmlFor="U_CARDNAME_V">Cliente Vehículo</label>
        </div>
        <div className="col s2 m1 input-field">
          <a className="btn-floating btn-medium waves-effect waves-light teal hoverable modal-trigger"
            href="#list-client-modal"
            onClick={() => setType('CV')}
          >
            <i className="material-icons">search</i></a>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m4 input-field">
          <i className='material-icons prefix'>event</i>
          <input type="date" disabled name="U_DocDate" id="U_DocDate" value={formData.U_DocDate || new Date().toISOString().split('T')[0]} onChange={handleChange} />
          <label htmlFor="U_DocDate">Fecha de Documento</label>
        </div>
        <div className="col s12 m4 input-field">
          <i className='material-icons prefix'>{getStatusIcon('Abierto')}</i>
          <input type="text" name='U_Estado' id='U_Estado' disabled value={'Abierto'} />
          <label htmlFor="U_Estado">Estado</label>
        </div>
        <div className="col s12 m4 input-field">
          <i className='material-icons prefix'>attach_money</i>
          <select name="U_Moneda" id="U_Moneda" value={formData.U_Moneda} onChange={handleChange}>
            <option value="" disabled>Seleccione una moneda</option>
            <option value="USD">Dolares</option>
            <option value="COL">Colones</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m3 input-field">
          <i className="material-icons prefix">badge</i>
          <input type="text" name='U_FooVend' id='U_FooVend' disabled value={formData.U_FooVend || ""} onChange={handleChange} />
          <label htmlFor="U_FooVend">Código</label>
        </div>
        <div className="col s10 m8 input-field">
          <input type="text" name='U_SlpName' id='U_SlpName' disabled value={formData.U_SlpName|| ""} onChange={handleChange} />
          <label htmlFor="U_SlpName">Vendedor</label>
        </div>
        <div className="col s2 m1 input-field">
          <a className="btn-floating btn-medium waves-effect waves-light teal hoverable modal-trigger"
            href="#list-seller-modal">
            <i className="material-icons">search</i>
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col s12 input-field" >
          <i className="material-icons prefix">comment</i>
          <textarea id="U_Opcion" name='U_Opcion' className="materialize-textarea" data-length="230"></textarea>
          <label htmlFor="U_Opcion">Comentarios</label>
        </div>
      </div>
      <ListClientModal onSelectClient={handleSelectClient} onAddClient={handleAddClient} type={type} setType={setType}/>
      <ListSellersModal onSelectSeller={handleSelectSeller} />
    </div>
  );
};

export default InformacionGeneralForm;
