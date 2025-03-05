import axios from 'axios';
import { getToken } from './service';

export const getSellersList = async (config, db) => {
  try {
    const token = await getToken(config);
    const response = await axios.get(
      `${config.URI}/SocioNegocio/listarvendedor?CodeBD=${db}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.ListVendedor;
  } catch (error) {
    throw error.message;
  }
};
