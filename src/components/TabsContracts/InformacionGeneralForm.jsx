import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import ListClientModal from '../ListClientModal';
import ListSellersModal from '../ListSellersModal';
import useCurrentDate from '../../hooks/useCurrentDate.js';

const InformacionGeneralForm = ({ formData, setFormData, setCurrentView }) => {
  const [type, setType] = useState(null);
  const currentDate = useCurrentDate();
  const [monedaCliente, setMonedaCliente] = useState('##');
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
    const textAreas = document.querySelectorAll('textarea#Opciones');
    M.CharacterCounter.init(textAreas);
  }, [formData]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "0":
        return 'cancel';
      case "2":
        return 'help_outline';
      case "1":
        return 'lock_open';
      case "3":
        return 'lock';      
      
    }
  };

  const handleSelectClient = (client) => {
    if (client.type === 'CF') {
      setFormData((prevData) => ({
        ...prevData,
        CodCliFactura: client.CardCode,
        NombCliFactura: client.CardName,
        //Tipo: client.Tipo === 'F' ? 2 : client.Tipo === 'J' ? 1 : 0,     
      }));
      setMonedaCliente(client.Moneda);
    }
    if (client.type === 'CV') {
      setFormData((prevData) => ({
        ...prevData,
        CodCliVehiculo: client.CardCode,
        NombCliVehiculo: client.CardName,
      }));
    }
    setType(null);
  };

  const handleSelectSeller = (seller) => {
    setFormData((prevData) => ({
      ...prevData,
      CodVendedor: seller.SlpCode,
      NombVendedor: seller.SlpName,
      CodTitular: seller.SlpCode,
      NombTitular: seller.SlpName,
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
          <input type="text" disabled name='CodCliFactura' id='CodCliFactura' value={formData.CodCliFactura} onChange={handleChange} />
          <label htmlFor="CodCliFactura">Código</label>
        </div>
        <div className="col s10 m8 input-field">
          <input type="text" disabled name='NombCliFactura' id='NombCliFactura' value={formData.NombCliFactura} onChange={handleChange} />
          <label htmlFor="NombCliFactura">Cliente a facturar</label>
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
          <input type="text" disabled name='CodCliVehiculo' id='CodCliVehiculo' value={formData.CodCliVehiculo} onChange={handleChange} />
          <label htmlFor="CodCliVehiculo">Código</label>
        </div>
        <div className="col s10 m8 input-field">
          <input type="text" disabled name='NombCliVehiculo' id='NombCliVehiculo' value={formData.NombCliVehiculo} onChange={handleChange}/>
          <label htmlFor="NombCliVehiculo">Cliente Vehículo</label>
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
          <input type="date" name="Fecha" id="Fecha" value={formData.Fecha===""?currentDate:formData.Fecha.split('T')[0]} onChange={handleChange} />
          <label htmlFor="Fecha" className="active">Fecha de Documento</label>
        </div>
        <div className="col s12 m4 input-field">
          <i className='material-icons prefix'>{getStatusIcon(formData.U_Estado)}</i>
          <select name='U_Estado' id='U_Estado' value={formData.U_Estado} onChange={handleChange}>
            <option value="0">Cancelado</option>
            <option value="1">Trámite</option>
            <option value="2">Pend. Fact</option>
            <option value="3">Facturado</option>
          </select>
          <label htmlFor="U_Estado">Estado</label>
        </div>
        <div className="col s12 m4 input-field">
          <i className='material-icons prefix'>attach_money</i>
          <select name="Moneda" id="Moneda" value={formData.Moneda} onChange={handleChange}>
            <option value="" disabled>Seleccione una moneda</option>
            <option value="USD" disabled={monedaCliente==='COL'}>Dolares</option>
            <option value="COL" disabled={monedaCliente==='USD'}>Colones</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m3 input-field">
          <i className="material-icons prefix">badge</i>
          <input type="text" name='CodVendedor' id='CodVendedor' disabled value={formData.CodVendedor || ""} onChange={handleChange} />
          <label htmlFor="CodVendedor">Código</label>
        </div>
        <div className="col s10 m8 input-field">
          <input type="text" name='NombVendedor' id='NombVendedor' disabled value={formData.NombVendedor|| ""} onChange={handleChange} />
          <label htmlFor="NombVendedor">Vendedor</label>
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
          <textarea id="Opciones" name='Opciones' className="materialize-textarea" data-length="230" value={formData.Opciones} onChange={handleChange}></textarea>
          <label htmlFor="Opciones">Comentarios</label>
        </div>
      </div>
      <ListClientModal onSelectClient={handleSelectClient} onAddClient={handleAddClient} type={type} setType={setType}/>
      <ListSellersModal onSelectSeller={handleSelectSeller} />
    </div>
  );
};

export default InformacionGeneralForm;
