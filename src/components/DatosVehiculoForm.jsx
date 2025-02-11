import React, { useEffect } from 'react';
import M from 'materialize-css';
const DatosVehiculoForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      datosVehiculo: {
        ...prevData.datosVehiculo,
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
          value={formData.datosVehiculo.unidad}
          onChange={handleChange}
          required
        />
        <label>Unidad (Código del Ítem)</label>
      </div>
      <div className="input-field">
        <input
          type="text"
          name="marca"
          value={formData.datosVehiculo.marca}
          onChange={handleChange}
          required
        />
        <label>Marca</label>
      </div>
      <div className="input-field">
        <input
          type="text"
          name="modelo"
          value={formData.datosVehiculo.modelo}
          onChange={handleChange}
          required
        />
        <label>Modelo</label>
      </div>
      <div className="input-field">
        <input
          type="number"
          name="precio"
          value={formData.datosVehiculo.precio}
          onChange={handleChange}
          required
        />
        <label>Precio</label>
      </div>
    </div>
  );
};
export default DatosVehiculoForm;
