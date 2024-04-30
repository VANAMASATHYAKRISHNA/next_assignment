import axios from "axios";
const instance = axios.create();

instance.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      return config;
    },
    (error) => {
      // Do something with request error
  
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
        // Logging response data or modifying response data
        return response;
    },
    (error) => {
        // Handle response error
        return Promise.reject(error);
    }
);

export default instance