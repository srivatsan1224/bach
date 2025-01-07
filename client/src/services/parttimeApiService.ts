import axios from "axios";

const parttimeApiService = axios.create({
  baseURL: "http://localhost:3002/api", // Replace with the part-time backend URL and port
});

export default parttimeApiService;
