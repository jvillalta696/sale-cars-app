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
    <>
    </>
  );
};

export default DatosVehiculoUsadoForm;
