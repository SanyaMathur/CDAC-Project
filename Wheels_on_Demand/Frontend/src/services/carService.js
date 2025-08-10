
import api from './axiosConfig';


export const getAllCars = async () => {
  try {
    const response = await api.get(`/car`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

export const getCarById = async (id) => {
  try {
    const response = await api.get(`/car/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    throw error;
  }
};


export const addCar = async (carData) => {
  try {
    const response = await api.post(`/car`, carData);
    return response.data;
  } catch (error) {
    console.error("Error adding car:", error);
    throw error;
  }
};

export const getCarsBySellerId = async (userId) => {
  try {
    const response = await api.get(`/Car/by-seller/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars by seller ID:", error);
    throw error;
  }
};