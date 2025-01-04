import 'materialize-css/dist/css/materialize.min.css';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import { useEffect } from 'react';
import M from 'materialize-css';
import formDataModel from '../models/formDataModel';

const FormClientes = ({ formData, handleChange, handleAddContactPerson, handleContactPersonChange, handleSubmit, setFormData }) => {
  useEffect(() => {
    M.updateTextFields();
  }, [formData]);

  const isUpdating = formData.id !== undefined;

  const handleResetForm = () => {
    setFormData({ ...formDataModel });
  };

  const handleDeleteContactPerson = (index) => {
    const newCntctPrsn = formData.cntctPrsn.filter((_, i) => i !== index);
    setFormData({ ...formData, cntctPrsn: newCntctPrsn });
  };

  return (
    <div className="container">
      <div className="white z-depth-3" style={{padding:10, marginTop:10}}>
      <h2>Formulario de Clientes</h2>
      <SearchBar onSelectClient={setFormData} />
      {formData.id && <button type="button" onClick={handleResetForm} className="btn">
        Crear Nuevo Cliente
      </button>}
      <form onSubmit={handleSubmit}>
    <div className="row">
    <div className="col s12 m6 l4 input-field">
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            required
          />
          <label htmlFor="cardName">Nombre del Socio de negocio</label>
        </div>
        <div className="col s12 m6 l4 input-field">
          <input
            type="text"
            name="cardType"
            value={formData.cardType}
            onChange={handleChange}
            required
          />
          <label htmlFor="cardType">Tipo de Socio</label>
        </div>
        <div className="col s12 m12 l4 input-field">
          <input
            type="text"
            name="groupCode"
            value={formData.groupCode}
            onChange={handleChange}
            required
          />
          <label htmlFor="groupCode">Grupo</label>
        </div>
    </div>
    <div className="row">
            <div className="col s12 m6 l12 input-field">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <label htmlFor="address">Dirección</label>
        </div>
        <div className="col s12 m6 l4 input-field">
          <input
            type="text"
            name="phone1"
            value={formData.phone1}
            onChange={handleChange}
            pattern="\d*"
            required
          />
          <label htmlFor="phone1">Teléfono 1</label>
        </div>
        <div className="col s12 m6 l4 input-field">
          <input
            type="text"
            name="phone2"
            value={formData.phone2}
            onChange={handleChange}
            pattern="\d*"
          />
          <label htmlFor="phone2">Teléfono 2</label>
        </div>
        <div className="col s12 m6 l4 input-field">
          <input
            type="text"
            name="fax"
            value={formData.fax}
            onChange={handleChange}
            pattern="\d*"
          />
          <label htmlFor="fax">Fax</label>
        </div>
    
    </div>      
        <div className="row">
        <div className="col s12 input-field">
          <button type="button" onClick={handleAddContactPerson} className="btn">
            Añadir Persona de Contacto
          </button>
          <ul className="collection">
            {formData.cntctPrsn.map((person, index) => (
            <li className='collection-item' key={index}>
              <div  className="row">
              <div className="col s12 m5 l5 input-field">
              <input
                type="text"
                value={person.name}
                onChange={(e) => handleContactPersonChange(index, 'name', e.target.value)}
                required
              />
              <label htmlFor={`cntctPrsn-name-${index}`}>Nombre de Persona de Contacto {index + 1}</label>
              </div>
              <div className="col s12 m5 l5 input-field">
              <input
                type="text"
                value={person.phone}
                onChange={(e) => handleContactPersonChange(index, 'phone', e.target.value)}
                required
              />
              <label htmlFor={`cntctPrsn-phone-${index}`}>Teléfono de Persona de Contacto {index + 1}</label>
              </div>
              <div className="col s12 m2 l1 offset-l1 input-field">
                <button type="button" onClick={() => handleDeleteContactPerson(index)} className="btn-floating red">
                <i className="large material-icons">delete</i>
                </button>
              </div>
            </div>
            </li>
          ))}
          </ul>          
        </div>
        </div>
        <div className="row">
        <div className="col s12 m6 l4 input-field">
          <input
            type="text"
            name="glblLocNum"
            value={formData.glblLocNum}
            onChange={handleChange}
            required
          />
          <label htmlFor="glblLocNum">Profesión</label>
        </div>
        <div className="col s12 m6 l4 input-field">
          <input
            type="text"
            name="licTradNum"
            value={formData.licTradNum}
            onChange={handleChange}
            required
          />
          <label htmlFor="licTradNum">Cédula Jurídica/Fisica</label>
        </div>
        <div className="col s12 m12 l4 input-field">
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="browser-default"
          >
            <option value="USD">USD</option>
            <option value="CRC">CRC</option>
            <option value="MULTI">Multi-moneda</option>
          </select>
          <label htmlFor="currency" className="active">Moneda</label>
        </div>
        </div>
        <div className="row">
        <div className="col s12 input-field">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Correo Electrónico</label>
        </div>
        </div>
        <div className="row">
            <div className="col s12 center">
            <button type="submit" className="btn">
              {isUpdating ? 'Actualizar Cliente' : 'Crear Cliente'}
            </button>
            </div>
        </div>
      </form>  
      </div>
      
    </div>
  );
};

FormClientes.propTypes = {
  formData: PropTypes.shape({
    id: PropTypes.number,
    cardName: PropTypes.string.isRequired,
    cardType: PropTypes.string.isRequired,
    groupCode: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phone1: PropTypes.string.isRequired,
    phone2: PropTypes.string,
    fax: PropTypes.string,
    cntctPrsn: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })).isRequired,
    glblLocNum: PropTypes.string.isRequired,
    licTradNum: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddContactPerson: PropTypes.func.isRequired,
  handleContactPersonChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default FormClientes;