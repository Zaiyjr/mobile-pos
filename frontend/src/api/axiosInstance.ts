import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // ປ່ຽນພອດໃຫ້ຕົງກັບຫຼັງບ້ານຂອງເຈົ້າເດີ້
});

// ແນບ Token ເຂົ້າໄປໃນ Header ທຸກຄັ້ງທີ່ຍິງ API
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;