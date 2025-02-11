import React, { useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import FormClientes from '../components/FormClientes';
import M from 'materialize-css';
import formDataModel from '../models/formDataModel';
import { createClient, updateClient } from '../services/client.service';
import { useAuth } from '../context/AuthContext';
import ContactModal from '../components/ContactModal';
import { useClient } from '../context/ClientContext';

const ViewFormClientes = () => {
  const [formData, setFormData] = useState({ ...formDataModel });
  const { apiConfig, currentCompany } = useAuth();
  const { fetchClients } = useClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [titleType, setTitleType] = useState('Crear');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddContactPerson = () => {
    setTitleType('Crear');
    setSelectedContact({
      InternalCode: null,
      Name: '',
      MobilePhone: '',
      Phone1: '',
      Phone2: '',
      E_Mail: '',
      FirstName: '',
      LastName: '',
      index: formData.Contacto.length,
    });
    setIsModalOpen(true);
  };

  const handleEditContactPerson = (index) => {
    setTitleType('Editar');
    setSelectedContact({ ...formData.Contacto[index], index });
    setIsModalOpen(true);
  };

  const handleUpdateContactPerson = (updatedContact) => {
    const newContacto = [...formData.Contacto];
    if (updatedContact.index >= newContacto.length) {
      updatedContact.Name = updatedContact.FirstName;
      newContacto.push(updatedContact);
    } else {
      newContacto[updatedContact.index] = updatedContact;
    }
    setFormData({ ...formData, Contacto: newContacto });
    setIsModalOpen(false);
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.CardCode !== '' && formData.CardCode !== undefined) {
      // Update existing client
      const res = await updateClient(apiConfig, currentCompany.code, formData);
      console.log(formData);
      M.toast({
        html: `Cliente ${formData.CardName} Actualizado con exito`,
        classes: 'green',
      });
    } else {
      // Create new client
      const newClient = { ...formData };
      try {
        const res = await createClient(
          apiConfig,
          currentCompany.code,
          newClient
        );
        console.log(res);
        if (res.Estado === 'Err') throw new Error(res.MsgError);
        fetchClients();
        M.toast({
          html: `Cliente ${formData.CardName} Creado con exito`,
          classes: 'green',
        });
        setFormData({ ...formDataModel });
      } catch (error) {
        M.toast({
          html: `Error al crear el cliente ${formData.CardName}`,
          classes: 'red',
        });
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <FormClientes
        formData={formData}
        handleChange={handleChange}
        handleAddContactPerson={handleAddContactPerson}
        handleEditContactPerson={handleEditContactPerson}
        handleSubmit={handleSubmit}
        setFormData={setFormData}
      />
      {isModalOpen && (
        <ContactModal
          titleType={titleType}
          contact={selectedContact}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdateContactPerson}
        />
      )}
    </>
  );
};

export default ViewFormClientes;
