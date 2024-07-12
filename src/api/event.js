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

const createEvent = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/store`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const editEvent = async (eventId, formData) => {
  try {
    const response = await axios.put(`${API_URL}/update/${eventId}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${API_URL}/remove/${eventId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export { fetchEvents, createEvent, editEvent, deleteEvent };
