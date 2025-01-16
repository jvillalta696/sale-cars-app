import 'materialize-css/dist/css/materialize.min.css';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import React, { useEffect } from 'react';
import M from 'materialize-css';
import formDataModel from '../models/formDataModel';

const FormClientes = ({
  formData,
  handleChange,
  handleAddContactPerson,
  handleContactPersonChange,
  handleSubmit,
  setFormData,
}) => {
  useEffect(() => {
    M.updateTextFields();
  }, [formData]);

  const isUpdating = formData.CardCode !== undefined;

  const handleResetForm = () => {
    setFormData({ ...formDataModel });
  };

  const handleDeleteContactPerson = (index) => {
    const newCntctPrsn = formData.Contacto.filter((_, i) => i !== index);
    setFormData({ ...formData, Contacto: newCntctPrsn });
  };

  return (
    <div className="container">
      <div className="white z-depth-3" style={{ padding: 10, marginTop: 10 }}>
        <h2>Formulario de Clientes</h2>
        <SearchBar onSelectClient={setFormData} />
        {formData.CardCode && (
          <button type="button" onClick={handleResetForm} className="btn">
            Crear Nuevo Cliente
          </button>
        )}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col s12 m6 l4 input-field">
              <input
                type="text"
                name="CardName"
                value={formData.CardName}
                onChange={handleChange}
                required
              />
              <label htmlFor="CardName">Nombre del Socio de negocio</label>
            </div>
            <div className="col s12 m6 l4 input-field">
              <input
                type="text"
                name="CardCode"
                value={formData.CardCode}
                onChange={handleChange}
                required
              />
              <label htmlFor="CardCode">Código del Socio</label>
            </div>
            <div className="col s12 m12 l4 input-field">
              <input
                type="text"
                name="GroupCode"
                value={formData.GroupCode}
                onChange={handleChange}
                required
              />
              <label htmlFor="GroupCode">Grupo</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m6 l12 input-field">
              <input
                type="text"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                required
              />
              <label htmlFor="Address">Dirección</label>
            </div>
            <div className="col s12 m6 l4 input-field">
              <input
                type="text"
                name="Phone1"
                value={formData.Phone1}
                onChange={handleChange}
                pattern="\d*"
                required
              />
              <label htmlFor="Phone1">Teléfono 1</label>
            </div>
            <div className="col s12 m6 l4 input-field">
              <input
                type="text"
                name="Phone2"
                value={formData.Phone2}
                onChange={handleChange}
                pattern="\d*"
              />
              <label htmlFor="Phone2">Teléfono 2</label>
            </div>
            <div className="col s12 m6 l4 input-field">
              <input
                type="text"
                name="Fax"
                value={formData.Fax}
                onChange={handleChange}
                pattern="\d*"
              />
              <label htmlFor="Fax">Fax</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 input-field">
              <button
                type="button"
                onClick={handleAddContactPerson}
                className="btn"
              >
                Añadir Persona de Contacto
              </button>
              <ul className="collection">
                {formData.Contacto.map((person, index) => (
                  <li className="collection-item" key={index}>
                    <div className="row">
                      <div className="col s12 m5 l5 input-field">
                        <input
                          type="text"
                          value={person.Name}
                          onChange={(e) =>
                            handleContactPersonChange(
                              index,
                              'Name',
                              e.target.value
                            )
                          }
                          required
                        />
                        <label htmlFor={`Contacto-Name-${index}`}>
                          Nombre de Persona de Contacto {index + 1}
                        </label>
                      </div>
                      <div className="col s12 m5 l5 input-field">
                        <input
                          type="text"
                          value={person.MobilePhone}
                          onChange={(e) =>
                            handleContactPersonChange(
                              index,
                              'MobilePhone',
                              e.target.value
                            )
                          }
                          required
                        />
                        <label htmlFor={`Contacto-MobilePhone-${index}`}>
                          Teléfono Móvil de Persona de Contacto {index + 1}
                        </label>
                      </div>
                      <div className="col s12 m2 l1 offset-l1 input-field">
                        <button
                          type="button"
                          onClick={() => handleDeleteContactPerson(index)}
                          className="btn-floating red"
                        >
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
                name="GlblLocNum"
                value={formData.GlblLocNum}
                onChange={handleChange}
                required
              />
              <label htmlFor="GlblLocNum">Profesión</label>
            </div>
            <div className="col s12 m6 l4 input-field">
              <input
                type="text"
                name="LictradNum"
                value={formData.LictradNum}
                onChange={handleChange}
                required
              />
              <label htmlFor="LictradNum">Cédula Jurídica/Fisica</label>
            </div>
            <div className="col s12 m12 l4 input-field">
              <select
                name="Currency"
                value={formData.Currency}
                onChange={handleChange}
                className="browser-default"
              >
                <option value="USD">USD</option>
                <option value="CRC">CRC</option>
                <option value="MULTI">Multi-moneda</option>
              </select>
              <label htmlFor="Currency" className="active">
                Moneda
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 input-field">
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
              <label htmlFor="Email">Correo Electrónico</label>
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
    CardCode: PropTypes.string,
    CardName: PropTypes.string.isRequired,
    GroupCode: PropTypes.string.isRequired,
    Address: PropTypes.string.isRequired,
    Phone1: PropTypes.string.isRequired,
    Phone2: PropTypes.string,
    Fax: PropTypes.string,
    Contacto: PropTypes.arrayOf(
      PropTypes.shape({
        InternalCode: PropTypes.number,
        Name: PropTypes.string.isRequired,
        MobilePhone: PropTypes.string.isRequired,
        Phone1: PropTypes.string,
        Phone2: PropTypes.string,
      })
    ).isRequired,
    GlblLocNum: PropTypes.string.isRequired,
    LictradNum: PropTypes.string.isRequired,
    Currency: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddContactPerson: PropTypes.func.isRequired,
  handleContactPersonChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default FormClientes;
