import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://blog-server-wto6.onrender.com/api/v1",
});

export default customFetch;
