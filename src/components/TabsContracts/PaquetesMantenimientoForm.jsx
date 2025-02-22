import React, { useEffect } from 'react';
import M from 'materialize-css';

const PaquetesMantenimientoForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      paquetesMantenimiento: {
        ...prevData.paquetesMantenimiento,
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
          name="paquete"
          value={formData.paquetesMantenimiento.paquete}
          onChange={handleChange}
          required
        />
        <label>Paquete de Mantenimiento</label>
      </div>
    </div>
  );
};

export default PaquetesMantenimientoForm;
