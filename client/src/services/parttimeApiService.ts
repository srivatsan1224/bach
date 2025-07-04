import axios from "axios";

const parttimeApiService = axios.create({
  baseURL: "http://localhost:3002/api", // Unified backend parttime service
});
//https://bachelors-web-wafg.onrender.com/api
export default parttimeApiService;
