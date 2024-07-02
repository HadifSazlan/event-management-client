const handleError = (error) => {
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
};

export default handleError;
