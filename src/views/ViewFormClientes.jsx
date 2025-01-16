import React, { useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import FormClientes from '../components/FormClientes';
import mockClients from '../mockData/mockClients.json';
import M from 'materialize-css';
import formDataModel from '../models/formDataModel';

const ViewFormClientes = () => {
  const [formData, setFormData] = useState({ ...formDataModel });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddContactPerson = () => {
    setFormData({
      ...formData,
      Contacto: [
        ...formData.Contacto,
        {
          InternalCode: null,
          Name: '',
          MobilePhone: '',
          Phone1: '',
          Phone2: '',
        },
      ],
    });
  };

  const handleContactPersonChange = (index, field, value) => {
    const newContacto = [...formData.Contacto];
    newContacto[index][field] = value;
    setFormData({ ...formData, Contacto: newContacto });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update existing client
      const index = mockClients.findIndex(
        (client) => client.id === formData.id
      );
      if (index !== -1) {
        mockClients[index] = formData;
        M.toast({
          html: `Cliente ${formData.cardName} Actualizado con exito`,
          classes: 'green',
        });
      }
    } else {
      // Create new client
      const newClient = { ...formData, id: mockClients.length + 1 };
      mockClients.push(newClient);
      M.toast({
        html: `Cliente ${formData.cardName} Creado con exito`,
        classes: 'green',
      });
      setFormData({ ...formDataModel });
    }
    console.log(mockClients);
  };

  return (
    <FormClientes
      formData={formData}
      handleChange={handleChange}
      handleAddContactPerson={handleAddContactPerson}
      handleContactPersonChange={handleContactPersonChange}
      handleSubmit={handleSubmit}
      setFormData={setFormData}
    />
  );
};

export default ViewFormClientes;
