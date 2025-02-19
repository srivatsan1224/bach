import axios from "axios";

const parttimeApiService = axios.create({
  baseURL: "https://bachelors-web-wafg.onrender.com/api", // Replace with the part-time backend URL and port
});

export default parttimeApiService;
