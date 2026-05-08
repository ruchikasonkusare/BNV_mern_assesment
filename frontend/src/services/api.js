import axios from "axios";

const API = axios.create({
  baseURL: "https://bnv-mern-assesment-2.onrender.com",  // must match backend port
});

export const toggleUserStatus = (id, status) =>
  API.patch(`/users/${id}/status`, { status });

// Users
export const getUsers    = (page, limit) => API.get(`/users?page=${page}&limit=${limit}`);
export const getUserById = (id)          => API.get(`/users/${id}`);
export const searchUsers = (q, page)     => API.get(`/users/search?q=${q}&page=${page}`);
export const createUser  = (data)        => API.post("/users", data);
export const updateUser  = (id, data)    => API.put(`/users/${id}`, data);
export const deleteUser  = (id)          => API.delete(`/users/${id}`);
export const exportCSV   = ()            => API.get("/users/export", { responseType: "blob" });