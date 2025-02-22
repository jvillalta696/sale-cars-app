import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';
import { getClientList } from '../services/client.service';

const clientContext = createContext();
export const useClient = () => {
  const context = useContext(clientContext);
  return context;
};

export const ClientProvider = ({ children }) => {
  const { apiConfig, currentCompany } = useAuth();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    if (apiConfig && currentCompany) {
      try {
        setLoading(true);
        const clientList = await getClientList(apiConfig, currentCompany.code);
        if (clientList.Estado !== 'OK') {
          throw new Error(clientList.Mensaje);
        }
        if (clientList.Estado === 'OK' && clientList.ListSocioNeg.length > 0) {
          setClients(clientList.ListSocioNeg);
        }
      } catch (error) {
        console.error('Error fetching client list:', error);
      } finally {
        setLoading(false);
        console.log(clients);
      }
    }
  };

  useEffect(() => {
    fetchClients();
  }, [apiConfig, currentCompany]);

  return (
    <clientContext.Provider value={{ clients, loading, fetchClients }}>
      {children}
    </clientContext.Provider>
  );
};

ClientProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
