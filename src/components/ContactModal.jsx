import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';

const ContactModal = ({ contact, onClose, onSave, titleType }) => {
  const [contactData, setContactData] = useState({ ...contact });

  useEffect(() => {
    M.Modal.init(document.querySelectorAll('.modal'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(contactData);
    M.Modal.getInstance(document.getElementById('contact-modal')).close();
  };

  return (
    <div id="contact-modal" className="modal open">
      <div className="modal-content">
        <h4>{titleType} Contacto</h4>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field col s12 m6 l6">
              <input
                type="text"
                name="FirstName"
                value={contactData.FirstName}
                onChange={handleChange}
                required
              />
              <label className="active" htmlFor="FirstName">
                Nombre
              </label>
            </div>
            <div className="input-field col s12 m6 l6">
              <input
                type="text"
                name="LastName"
                value={contactData.LastName}
                onChange={handleChange}
                required
              />
              <label className="active" htmlFor="LastName">
                Apellidos
              </label>
            </div>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="MobilePhone"
              value={contactData.MobilePhone}
              onChange={handleChange}
              required
            />
            <label className="active" htmlFor="MobilePhone">
              Teléfono Móvil
            </label>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="Phone1"
              value={contactData.Phone1}
              onChange={handleChange}
            />
            <label className="active" htmlFor="Phone1">
              Teléfono 1
            </label>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="Phone2"
              value={contactData.Phone2}
              onChange={handleChange}
            />
            <label className="active" htmlFor="Phone2">
              Teléfono 2
            </label>
          </div>
          <div className="input-field">
            <input
              type="email"
              name="E_Mail"
              value={contactData.E_Mail}
              onChange={handleChange}
              required
            />
            <label className="active" htmlFor="E_Mail">
              Correo Electrónico
            </label>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="modal-close btn-flat"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="btn">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ContactModal.propTypes = {
  contact: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ContactModal;
