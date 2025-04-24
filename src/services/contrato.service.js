import axios from 'axios';
import { getToken } from './service';

export const getContratoList = async (config, db) => {
  try {
    const token = await getToken(config);
    const response = await axios.get(
      `${config.URI}/ContratoVentas/listarcontrato?CodeBD=${db}`,
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

export const getContratoById = async (config, db, contratoId) => {
  try {
    const token = await getToken(config);
    const response = await axios.get(
      `${config.URI}/ContratoVentas/contrato?CodeBD=${db}&Contrato=${contratoId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.Contrato;
  } catch (error) {
    throw error.message;
  }
};

export const createContrato = async (config, db, contrato) => {
  try {
    const token = await getToken(config);
    const response = await axios.post(
      `${config.URI}/ContratoVentas/crearcontrato?CodeBD=${db}`,
      contrato,
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
}
export const updateContrato = async (config, db, contracto) => {
  try {
    const token = await getToken(config);
    const response = await axios.patch (
      `${config.URI}/ContratoVentas/actualizarcontrato?CodeBD=${db}&NumContratro=${contracto.DocNum}`,
      contracto,
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
}
