import axios from 'axios';
const config = {
    URI: 'https://db.cloud.delserint.com:466/AuthFirebase/api/',
};
export const createUser = async (data) => {
    try {
        const response = await axios.post(
        `${config.URI}usuario/`,
        data
        );
        return response.data;
    } catch (error) {
        throw error.response.data.errorMsg;
    }
};

export const updateUser = async (id,data) => {
    try {
        const response = await axios.patch(
        `${config.URI}usuario/${id}`,
        data
        );
        return response.data;
    } catch (error) {
        throw error.response.data.errorMsg;
    }
};

export const getUser = async (id) => {
    try {
        const response = await axios.get(
        `${config.URI}usuario/${id}`
        );
        return response.data;
    } catch (error) {
        throw error.response.data.errorMsg;
    }
}
export const getUsers = async () => {
    try {
        const response = await axios.get(
        `${config.URI}usuario/`
        );
        return response.data;
    } catch (error) {
        throw error.response.data.errorMsg;
    }
};
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(
        `${config.URI}usuario/${id}`
        );
        return response.data;
    } catch (error) {
        throw error.response.data.errorMsg;
    }
};