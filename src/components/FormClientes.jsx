import 'materialize-css/dist/css/materialize.min.css';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import React, { useEffect } from 'react';
import M from 'materialize-css';
import formDataModel from '../models/formDataModel';
import { getGroupList, getPerson } from '../services/client.service';
import { useAuth } from '../context/AuthContext';
import LoadingIcon from './LoadingIcon';

/**
 * @typedef {import('../models/formDataModel.ts').FormDataModel} FormDataModel
 * @typedef {import('../models/contactModel.ts').ContactModel} ContactModel
 */

/**
 * @param {{
 *   formData: FormDataModel,
 *   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
 *   handleAddContactPerson: () => void,
 *   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
 *   setFormData: React.Dispatch<React.SetStateAction<FormDataModel>>,
 *   handleEditContactPerson: (index: number) => void,
 * }} props
 */
const FormClientes = ({
  formData,
  handleChange,
  handleAddContactPerson,
  handleSubmit,
  setFormData,
  handleEditContactPerson,
}) => {
  const [groupList, setGroupList] = React.useState([]);
  const [isfound, setIsFound] = React.useState(false);
  const [personLoading, setPersonLoading] = React.useState(false);
  const { currentCompany, apiConfig } = useAuth();

  useEffect(() => {
    M.updateTextFields();
  }, [formData]);

  useEffect(() => {
    const fetchGroupList = async () => {
      try {
        const groups = await getGroupList(apiConfig, currentCompany.code);
        setGroupList(groups);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchGroupList();
  }, [currentCompany, apiConfig]);

  const isUpdating = formData.CardCode !== '';

  const handleResetForm = () => {
    setFormData({ ...formDataModel });
    setIsFound(false);
  };

  const handleDeleteContactPerson = (index) => {
    const newCntctPrsn = formData.Contacto.filter((_, i) => i !== index);
    setFormData({ ...formData, Contacto: newCntctPrsn });
  };

  const handleSearchPerson = async () => {
    try {
      setPersonLoading(true);
      const person = await getPerson(apiConfig, formData.LictradNum);
      if (!person.MsgError) {
        setFormData({
          ...formData,
          CardName: person.Nombre,
          TypeID: person.Tipo,
        });
        setIsFound(true);
        M.toast({
          html: `Persona ${person.Nombre} encontrado!`,
          classes: 'green',
        });
      } else {
        setIsFound(false);
        M.toast({
          html: `Error: ${person.MsgError}`,
          classes: 'red',
        });
      }
    } catch (error) {
      M.toast({
        html: `Error: ${error.message}`,
        classes: 'red',
      });
      console.error(error.message);
    } finally {
      setPersonLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="white z-depth-3" style={{ padding: 10, marginTop: 10 }}>
        <h2>Formulario de Clientes</h2>
        <SearchBar onSelectClient={setFormData} onIsFound={setIsFound} />
        {formData.CardCode && (
          <button type="button" onClick={handleResetForm} className="btn">
            Crear Nuevo Cliente
          </button>
        )}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col s12 m12 l2 input-field">
              {personLoading ? (
                <LoadingIcon />
              ) : (
                <i
                  className="material-icons prefix"
                  style={{ cursor: 'pointer' }}
                  hidden={isfound}
                  onClick={handleSearchPerson}
                >
                  add_circle
                </i>
              )}
              <input
                type="text"
                name="LictradNum"
                value={formData.LictradNum}
                disabled={isfound}
                onChange={handleChange}
                required
              />
              <label htmlFor="LictradNum">Identifición</label>
              {isfound && formData.CardCode === '' && (
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="btn"
                  style={{ marginTop: '10px' }}
                >
                  Buscar de nuevo
                </button>
              )}
            </div>
            <div className="col s12 m12 l4 input-field">
              <input
                type="text"
                name="CardName"
                value={formData.CardName}
                disabled
                onChange={handleChange}
                required
              />
              <label htmlFor="CardName">Nombre del Socio de negocio</label>
            </div>
            <div className="col s12 m12 l2 input-field">
              <input
                type="text"
                name="TypeID"
                value={formData.TypeID === 'J' ? 'Jurídica' : 'Física'}
                onChange={handleChange}
                disabled
                required
              />
              <label htmlFor="CardName">Tipo de Identifición</label>
            </div>
            <div className="col s12 m12 l4 input-field">
              <select
                name="GroupCode"
                value={formData.GroupCode}
                onChange={handleChange}
                className="browser-default"
                required
              >
                <option value="" disabled>
                  Seleccione un grupo
                </option>
                {groupList.map((group) => (
                  <option key={group.Code} value={group.Code}>
                    {group.Name}
                  </option>
                ))}
              </select>
              <label htmlFor="GroupCode" className="active">
                Grupo
              </label>
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
                onClick={handleAddContactPerson}
                className="btn modal-trigger"
                data-target="contact-modal"
              >
                Añadir Persona de Contacto
              </button>
              <ul className="collection">
                {formData.Contacto.length > 0 &&
                  formData.Contacto.map((person, index) => (
                    <li className="collection-item" key={index}>
                      <div className="row">
                        <div className="col s12 m10 l10">
                          <span>
                            {person.FirstName} {person.LastName} -{' '}
                            {person.E_Mail}
                          </span>
                        </div>
                        <div className="col s12 m1 l1">
                          <button
                            type="button"
                            onClick={() => handleEditContactPerson(index)}
                            className="btn-floating blue modal-trigger"
                            data-target="contact-modal"
                          >
                            <i className="large material-icons">edit</i>
                          </button>
                        </div>
                        <div className="col s12 m1 l1">
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
            <div className="col s12 m12 l4 input-field">
              <select
                name="Currency"
                value={formData.Currency}
                onChange={handleChange}
                className="browser-default"
              >
                <option value="USD">USD</option>
                <option value="COL">CRC</option>
                <option value="##">Multi-moneda</option>
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
    GroupCode: PropTypes.any.isRequired,
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
  handleSubmit: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleEditContactPerson: PropTypes.func.isRequired,
};

export default FormClientes;
