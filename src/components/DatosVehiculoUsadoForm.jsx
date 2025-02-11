import React, { useEffect } from 'react';
import M from 'materialize-css';

const DatosVehiculoUsadoForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      datosVehiculoUsado: {
        ...prevData.datosVehiculoUsado,
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
          name="unidad"
          value={formData.datosVehiculoUsado.unidad}
          onChange={handleChange}
          required
        />
        <label>Unidad (Código del Ítem)</label>
      </div>
      <div className="input-field">
        <input
          type="text"
          name="marca"
          value={formData.datosVehiculoUsado.marca}
          onChange={handleChange}
          required
        />
        <label>Marca</label>
      </div>
      <div className="input-field">
        <input
          type="text"
          name="modelo"
          value={formData.datosVehiculoUsado.modelo}
          onChange={handleChange}
          required
        />
        <label>Modelo</label>
      </div>
    </div>
  );
};

export default DatosVehiculoUsadoForm;
