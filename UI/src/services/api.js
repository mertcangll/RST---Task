import axios from "axios";

const API_URL = "http://localhost:5201/api/tasks";

const getTasks = async (params) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

const getTaskById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

const updateTask = async (id, task) => {
  await axios.put(`${API_URL}/${id}`, task);
};

const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export default { getTasks, getTaskById, createTask, updateTask, deleteTask };
