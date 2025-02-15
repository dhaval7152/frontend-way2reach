import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getRoles = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/roles/getRoles`);
  return response.data;
};

export const saveFormData = async (formData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/forms/saveData`,
    formData
  );
  return response.data;
};

export const getFormsByRole = async (role) => {
  const response = await axios.get(`${API_BASE_URL}/api/forms/${role}`);
  return response.data;
};
