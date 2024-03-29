import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const getPhoneById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const deletePhoneById = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, getPhoneById, deletePhoneById };
