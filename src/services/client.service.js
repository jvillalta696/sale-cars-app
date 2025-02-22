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

export const updateClient = async (config, db, data) => {
  try {
    const token = await getToken(config);
    const response = await axios.patch(
      `${config.URI}/SocioNegocio/actualizarsocio?CodeBD=${db}&CardCode=${data.CardCode}`,
      data,
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

export const getGroupList = async (config, db) => {
  try {
    const token = await getToken(config);
    const response = await axios.get(
      `${config.URI}/SocioNegocio/GrpCliente?CodeBD=${db}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.ListGrpCliente;
  } catch (error) {
    throw error.message;
  }
};

export const getPerson = async (config, data) => {
  try {
    const token = await getToken(config);
    const response = await axios.get(
      `${config.URI}/SocioNegocio/buscarcedula?cedula=${data}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const createClient = async (config, db, data) => {
  try {
    const token = await getToken(config);
    const response = await axios.post(
      `${config.URI}/SocioNegocio/crear?CodeBD=${db}`,
      data,
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
