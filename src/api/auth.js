import axios from "axios";

const registerUser = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/register",
      data
    );
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

const loginUser = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/login",
      data,
      { withCredentials: true }
    );
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

export { registerUser, loginUser };
