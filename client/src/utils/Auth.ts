import axios from "axios";

const baseUrl = "http://localhost:8000";

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${baseUrl}/validate`, {
      withCredentials: true,
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};
