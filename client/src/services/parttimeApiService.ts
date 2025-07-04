import axios from "axios";

const parttimeApiService = axios.create({
  baseURL: "http://localhost:3000/api/parttime", // Unified backend parttime service
});
//https://bachelors-web-wafg.onrender.com/api
export default parttimeApiService;