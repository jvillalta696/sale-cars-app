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
