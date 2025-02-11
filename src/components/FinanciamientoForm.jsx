import React, { useEffect } from 'react';
import M from 'materialize-css';

const FinanciamientoForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      financiamiento: {
        ...prevData.financiamiento,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    M.updateTextFields();
  }, [formData]);

  return (
    <div>
      <div className="input-field">
        <input
          type="text"
          name="entidad"
          value={formData.financiamiento.entidad}
          onChange={handleChange}
          required
        />
        <label>Entidad Financiera</label>
      </div>
      <div className="input-field">
        <input
          type="number"
          name="monto"
          value={formData.financiamiento.monto}
          onChange={handleChange}
          required
        />
        <label>Monto</label>
      </div>
    </div>
  );
};

export default FinanciamientoForm;
