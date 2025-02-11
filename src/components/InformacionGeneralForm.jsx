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
    // Initialize Materialize CSS select
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    M.updateTextFields();
  }, [formData]);
  return (
    <div>
      <div className="input-field">
        <input
          type="text"
          name="numeroContrato"
          value={formData.numeroContrato}
          onChange={handleChange}
          required
        />
        <label>Número de Contrato</label>
      </div>
      <div className="input-field">
        <input
          type="text"
          name="clienteFacturacion"
          value={formData.clienteFacturacion}
          onChange={handleChange}
          required
        />
        <label>Cliente a Facturar</label>
      </div>
      <div className="input-field">
        <select
          name="tipoIdentificacion"
          value={formData.tipoIdentificacion}
          onChange={handleChange}
        >
          <option value="" disabled>
            Seleccione Tipo de Identificación
          </option>
          <option value="fisica">Física</option>
          <option value="juridica">Jurídica</option>
        </select>
        <label>Tipo de Identificación</label>
      </div>
      <div className="input-field">
        <input
          type="text"
          name="clientePropietario"
          value={formData.clientePropietario}
          onChange={handleChange}
        />
        <label>Cliente Dueño del Vehículo</label>
      </div>
      <div className="input-field">
        <input
          type="text"
          name="vendedor"
          value={formData.vendedor}
          onChange={handleChange}
          required
        />
        <label>Vendedor</label>
      </div>
      <div className="input-field">
        <input
          type="date"
          name="fechaDocumento"
          value={formData.fechaDocumento}
          onChange={handleChange}
          required
        />
        <label>Fecha del Documento</label>
      </div>
      <div className="input-field">
        <textarea
          name="opciones"
          className="materialize-textarea"
          value={formData.opciones}
          onChange={handleChange}
        ></textarea>
        <label>Opciones (Comentarios)</label>
      </div>
    </div>
  );
};

export default InformacionGeneralForm;
