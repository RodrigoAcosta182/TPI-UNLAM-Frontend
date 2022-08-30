import axios from "axios";


    
const axiosInstance = async (history = null) => {

  let  baseUrl = await fetch("./config.json"); 
  baseUrl = await baseUrl.json();
  baseUrl = baseUrl.REACT_APP_BACKEND_URL; 

  let headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Accept: "application/json",
  };

  if (sessionStorage.token) {
    headers.Authorization = `Bearer ${sessionStorage.token}`;
  }

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve, _reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((_resolve, reject) => {
          reject(error);
        });
      }
    }
  );
  return axiosInstance;
};

export default axiosInstance;
