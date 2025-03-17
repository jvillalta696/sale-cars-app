import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';
import { getContratoList } from '../services/contrato.service';

/**
 * @typedef {import('../models/ListaContratosModel').ListaContratosModel} ListaContratosModel
 */

const contractContext = createContext(null);
export const useContract = () => {
  const context = useContext(contractContext);
  return context;
};

export const ContractProvider = ({ children }) => {
  const { apiConfig, currentCompany } = useAuth();
  const [contracts, setContracts] = useState(/** @type {ListaContratosModel} */ ({ ListaContratos: [] }));
  const [loading, setLoading] = useState(true);

  const fetchContracts = async () => {
    if (apiConfig && currentCompany) {
      try {
        setLoading(true);
        const contractList = await getContratoList(apiConfig, currentCompany.code);
        if (contractList.Estado !== 'OK') {
          throw new Error(contractList.Mensaje);
        }
        if (contractList.Estado === 'OK' && contractList.ListaContratos.length > 0) {
          setContracts({ ListaContratos: contractList.ListaContratos });
        }
      } catch (error) {
        console.error('Error fetching contract list:', error);
      } finally {
        setLoading(false);       
      }
    }
  };

  useEffect(() => {
    fetchContracts();
  }, [apiConfig, currentCompany]);

  return (
    <contractContext.Provider value={{ contracts, loading, fetchContracts }}>
      {children}
    </contractContext.Provider>
  );
};

ContractProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
