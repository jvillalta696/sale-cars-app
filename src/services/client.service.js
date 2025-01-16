import axios from 'axios';
import { getToken } from './service';

export const getClientList = async (config, db) => {
  try {
    const token = await getToken(config);
    const response = await axios.get(
      `${config.URI}/SocioNegocio/listarsocio?CodeBD=${db}`,
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

export const getClientByCode = async (config, db, data) => {
  try {
    const token = await getToken(config);
    const response = await axios.get(
      `${config.URI}/SocioNegocio/buscarsocio?CodeBD=${db}&CardCode=${data}`,
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
