import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';
import { getSellersList } from '../services/seller.service';

const SellerContext = createContext();
export const useSeller = () => {
  const context = useContext(SellerContext);
  return context;
};

export const SellerProvider = ({ children }) => {
  const { apiConfig, currentCompany } = useAuth();
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellers = async () => {
    if (apiConfig && currentCompany) {
      try {
        setLoading(true);
        const sellerList = await getSellersList(apiConfig, currentCompany.code);
        setSellers(sellerList);        
      } catch (error) {
        console.error('Error fetching seller list:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchSellers();
  }, [apiConfig, currentCompany]);

  return (
    <SellerContext.Provider value={{ sellers, loading, fetchSellers }}>
      {children}
    </SellerContext.Provider>
  );
};

SellerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
