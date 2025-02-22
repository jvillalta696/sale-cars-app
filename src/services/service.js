import axios from 'axios';

export const getToken = async (config) => {
  const { UserName, Password } = config;
  try {
    const response = await axios.post(
      `${config.URI}/login/authenticate`,
      {
        UserName,
        Password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
