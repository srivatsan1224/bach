import axios from "axios";

const apiService = axios.create({
  baseURL: "https://bachelors-web.onrender.com/api", // Replace with your backend U
});

export default apiService;
