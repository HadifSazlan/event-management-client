import { registerUser, loginUser } from "../api/auth";

const handleRegister = async (data, navigate) => {
  try {
    await registerUser(data);
    navigate("/login");
  } catch (error) {
    console.error(error.message);
  }
};

const handleLogin = async (data, navigate) => {
  try {
    const result = await loginUser(data);
    if (result.token) {
      console.log(result);
      navigate("/home");
    }
  } catch (error) {
    console.error(error.message);
  }
};

export { handleRegister, handleLogin };
