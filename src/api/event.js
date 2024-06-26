import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/";

const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log("No response from server", error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
};

export { fetchEvents };
