import axios from "axios";
import BASE_URL from "../../config/config";
// LOGIN ACTION
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const payload = {
      identifier: credentials.emailOrMobile,
      password: credentials.password,
    };

    const response = await axios.post(`${BASE_URL}/login`, payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    const { token, user } = response.data;

    // ✅ Map numeric role to string
    const roleMap = {
      1: "admin",
      2: "team",
      3: "seller",
    };
    const mappedUser = { ...user, role: roleMap[user.userRole] };

    // Save in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(mappedUser));

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: { token, user: mappedUser },
    });
  } catch (error) {
    console.error("Login error:", error);
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

// LOGOUT ACTION
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("authToken");
  dispatch({ type: "LOGOUT" });
};