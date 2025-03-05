import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';
import { getVehiclesListBrand, getVehiclesListUseds } from '../services/vehicule.service';

const VehicleNewContext = createContext();
export const useVehicle = () => {
  const context = useContext(VehicleNewContext);
  return context;
};

export const VehicleNewProvider = ({ children }) => {
  const { apiConfig, currentCompany } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesUseds, setVehiclesUseds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVehiclesBrands = async () => {
    if (apiConfig && currentCompany) {
      try {
        setLoading(true);
        const VehicleList = await getVehiclesListBrand(apiConfig, currentCompany.code);
        if (VehicleList.Estado !== 'OK') {
          throw new Error(VehicleList.Mensaje);
        }
        if (VehicleList.Estado === 'OK' && VehicleList.ListaMarcas.length > 0) {
          setVehicles(VehicleList.ListaMarcas);
        }
      } catch (error) {
        console.error('Error fetching Vehicle list:', error);
      } finally {
        setLoading(false);       
      }
    }
  };

  const fetchVehiclesUseds = async () => {
    if (apiConfig && currentCompany) {
      try {
        setLoading(true);
        const VehicleListUseds = await getVehiclesListUseds(apiConfig, currentCompany.code);
        if (VehicleListUseds.Estado !== 'OK') {
          throw new Error(VehicleListUseds.Mensaje);
        }
        if (VehicleListUseds.Estado === 'OK' && VehicleListUseds.ListaUsados.length > 0) {
          setVehiclesUseds(VehicleListUseds.ListaUsados);
        }
      } catch (error) {
        console.error('Error fetching Vehicle useds list:', error);
      } finally {
        setLoading(false);       
      }
    }
  };

  useEffect(() => {
    fetchVehiclesBrands();
  }, [apiConfig, currentCompany]);

  useEffect(() => {
    fetchVehiclesUseds();
  }, [apiConfig, currentCompany]);

  return (
    <VehicleNewContext.Provider value={{ vehicles, vehiclesUseds,loading, fetchVehiclesBrands, fetchVehiclesUseds}}>
      {children}
    </VehicleNewContext.Provider>
  );
};

VehicleNewProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
