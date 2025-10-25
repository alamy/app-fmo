import axios from 'axios';

const API_URL = 'http://localhost:1411/users';

const usuarioService = {
  getAll: () => axios.get(API_URL),
  getById: (id) => axios.get(`${API_URL}/${id}`),
  create: (data) => axios.post(API_URL, data),
  update: (id, data) => axios.put(`${API_URL}/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/${id}`)
};

export default usuarioService;
