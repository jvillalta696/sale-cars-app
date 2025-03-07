import axios from 'axios';
import { getToken } from './service';

export const getBancosList = async (config, db) => {
  try {
    const token = await getToken(config);
    const response = await axios.get(
      `${config.URI}/ContratoVentas/listarbanco?CodeBD=${db}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.ListaBancos;
  } catch (error) {
    throw error.message;
  }
};
