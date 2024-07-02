import axios from "axios";
import handleError from "../utils/errorHandler.js";

const API_URL = process.env.REACT_APP_API_URL;

const registerUser = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/register`,
      data
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const loginUser = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export { registerUser, loginUser };
