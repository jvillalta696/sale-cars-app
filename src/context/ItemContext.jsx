import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';
import { getItemList } from '../services/item.service';

const itemContext = createContext(null);
export const useItem = () => {
  const context = useContext(itemContext);
  return context;
};

export const ItemProvider = ({ children }) => {
  const { apiConfig, currentCompany } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    if (apiConfig && currentCompany) {
      try {
        setLoading(true);
        const itemList = await getItemList(apiConfig, currentCompany.code);
        if (itemList.Estado !== 'OK') {
            
          throw new Error(itemList.MsgError);
        }
        if (itemList.Estado === 'OK' && itemList.ListArt.length > 0) {
          setItems(itemList.ListArt);
        }
      } catch (error) {
        console.error('Error fetching item list:', error);
      } finally {
        setLoading(false);        
      }
    }
  };

  useEffect(() => {
    fetchItems();
  }, [apiConfig, currentCompany]);

  return (
    <itemContext.Provider 
// @ts-ignore
    value={{ items, loading, fetchItems }}>
      {children}
    </itemContext.Provider>
  );
};

ItemProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
