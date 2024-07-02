import axios from "axios";
import handleError from "../utils/errorHandler.js";

const API_URL = process.env.REACT_APP_API_URL;

const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/index`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export { fetchEvents };
