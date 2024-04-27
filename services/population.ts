import instance from "./axiosInstance";


export const getNationPopulation = () => {
    return instance
      .get(' https://datausa.io/api/data?drilldowns=Nation&measures=Population')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  };