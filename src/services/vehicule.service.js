import axios from 'axios';
import { getToken } from './service';

export const getVehiculesList = async (config, db, data) => {
  try {
    const token = await getToken(config);
    const response = await axios.get(
      `${config.URI}/Vehiculo/buscarVIN?CodeBD=${db}&VIN=${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.Vehiculo;
  } catch (error) {
    throw error.message;
  }
};

export const getVehiculeByVIN = async (config, db, data) => {
  try {
    const token = await getToken(config);
    const response = await axios.get(
      `${config.URI}/Vehiculo/buscarvehiculo?CodeBD=${db}&VIN=${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const getVehiclesListBrand = async (config, db) => {
  try {
    const token = await getToken(config);
    const response = await axios.get(
      `${config.URI}/ContratoVentas/listarmarca?CodeBD=${db}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }  
};

export const getVehiclesListUseds = async (config, db) => {
  try {
    const token = await getToken(config);
    const response = await axios.get(
      `${config.URI}/ContratoVentas/listarvehiusados?CodeBD=${db}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }  
};

export const getVehicleSaleData = async (config, db, brand, model, color) => {
  try {
    const token = await getToken(config);
    const response = await axios.get(
      `${config.URI}/ContratoVentas/vehiventa?CodeBD=${db}&Marca=${brand}&Modelo=${model}&Color=${color}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );    
    return response.data.VehiculoVenta;
  } catch (error) {
    throw error.message;
  }
};

export const getUsedVehicleData = async (config, db, unidad) => {
  try {
    const token = await getToken(config);
    const response = await axios.get(
      `${config.URI}/ContratoVentas/vehiusado?CodeBD=${db}&Unidad=${unidad}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.VehUsado;
  } catch (error) {
    throw error.message;
  }
};
