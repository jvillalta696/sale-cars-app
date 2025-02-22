import React, { useEffect } from 'react';
import M from 'materialize-css';

const DatosVentaForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      datosVenta: {
        ...prevData.datosVenta,
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
          type="number"
          name="precioVenta"
          value={formData.datosVenta.precioVenta}
          onChange={handleChange}
          required
        />
        <label>Precio de Venta</label>
      </div>
      <div className="input-field">
        <input
          type="number"
          name="totalVenta"
          value={formData.datosVenta.totalVenta}
          onChange={handleChange}
          required
        />
        <label>Total de la Venta</label>
      </div>
    </div>
  );
};

export default DatosVentaForm;
