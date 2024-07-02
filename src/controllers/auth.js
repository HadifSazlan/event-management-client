import { registerUser, loginUser } from "../api/auth";
import { jwtDecode } from "jwt-decode";

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
      const decodedToken = jwtDecode(result.token);

      if (decodedToken.role === "user") {
        navigate("/home");
      } else if (decodedToken.role === "admin") {
        navigate("/dashboard");
      } else {
        console.error("Unknown role");
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

export { handleRegister, handleLogin };
