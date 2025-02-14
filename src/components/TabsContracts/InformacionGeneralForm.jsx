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
    <>
    </>
  );
};

export default InformacionGeneralForm;
