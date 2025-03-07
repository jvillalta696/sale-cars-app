import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';
import { getBancosList } from '../services/financiamiento.service';

const bankContext = createContext();
export const useBank = () => {
  const context = useContext(bankContext);
  return context;
};

export const BankProvider = ({ children }) => {
  const { apiConfig, currentCompany } = useAuth();
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanks = async () => {
    if (apiConfig && currentCompany) {
      try {
        setLoading(true);
        const bankList = await getBancosList(apiConfig, currentCompany.code);
        setBanks(bankList);
      } catch (error) {
        console.error('Error fetching bank list:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBanks();
  }, [apiConfig, currentCompany]);

  return (
    <bankContext.Provider value={{ banks, loading, fetchBanks }}>
      {children}
    </bankContext.Provider>
  );
};

BankProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
