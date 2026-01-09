import axios from "axios";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";

export const BUSINESS_LOGIN_REQUEST = "BUSINESS_LOGIN_REQUEST";
export const BUSINESS_LOGIN_SUCCESS = "BUSINESS_LOGIN_SUCCESS";
export const BUSINESS_LOGIN_FAILURE = "BUSINESS_LOGIN_FAILURE";

export const BUSINESS_FORGOT_PASSWORD_REQUEST = "BUSINESS_FORGOT_PASSWORD_REQUEST";
export const BUSINESS_FORGOT_PASSWORD_SUCCESS = "BUSINESS_FORGOT_PASSWORD_SUCCESS";
export const BUSINESS_FORGOT_PASSWORD_FAILURE = "BUSINESS_FORGOT_PASSWORD_FAILURE";

export const BUSINESS_VERIFY_OTP_REQUEST = "BUSINESS_VERIFY_OTP_REQUEST";
export const BUSINESS_VERIFY_OTP_SUCCESS = "BUSINESS_VERIFY_OTP_SUCCESS";
export const BUSINESS_VERIFY_OTP_FAILURE = "BUSINESS_VERIFY_OTP_FAILURE";

export const BUSINESS_RESET_PASSWORD_REQUEST = "BUSINESS_RESET_PASSWORD_REQUEST";
export const BUSINESS_RESET_PASSWORD_SUCCESS = "BUSINESS_RESET_PASSWORD_SUCCESS";
export const BUSINESS_RESET_PASSWORD_FAILURE = "BUSINESS_RESET_PASSWORD_FAILURE";

export const BUSINESS_LOGOUT = "BUSINESS_LOGOUT";


//  LOGIN
export const businessLogin = (credentials,navigate) => async (dispatch) => {
  try {
    dispatch({ type: BUSINESS_LOGIN_REQUEST });

    const response = await axios.post(`${BASE_URL}/businessDetails/login`, credentials);
    const { token, seller } = response.data;

    // Save token in localStorage for persistence
    localStorage.setItem("authToken", token);
    localStorage.setItem("seller", JSON.stringify(seller));
    dispatch({
      type: BUSINESS_LOGIN_SUCCESS,
      payload: { token, seller },
    });
    if (seller?.mouStatus === 0) {
      navigate("/seller/mou-1");
    } else {
      navigate("/seller/dashboard");
    }
    return response.data;
  } catch (error) {
    dispatch({
      type: BUSINESS_LOGIN_FAILURE,
      payload: error.response?.data?.message || "Login failed",
    });
    toast.error(error.response?.data?.message || "Login failed");
    return null; 
  }
};



// FORGOT PASSWORD (OTP GENERATION)
export const businessForgotPassword = (identifier) => async (dispatch) => {
  try {
    dispatch({ type: BUSINESS_FORGOT_PASSWORD_REQUEST });

    const response = await axios.post(`${BASE_URL}/businessDetails/forgot-password`, { identifier });
    dispatch({
      type: BUSINESS_FORGOT_PASSWORD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: BUSINESS_FORGOT_PASSWORD_FAILURE,
      payload: error.response?.data?.message || "Failed to send OTP",
    });
  }
};

// VERIFY OTP
export const businessVerifyOtp = (identifier, otp) => async (dispatch) => {
  try {
    dispatch({ type: BUSINESS_VERIFY_OTP_REQUEST });

    const response = await axios.post(`${BASE_URL}/businessDetails/verify-otp`, { identifier, otp });
    dispatch({
      type: BUSINESS_VERIFY_OTP_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: BUSINESS_VERIFY_OTP_FAILURE,
      payload: error.response?.data?.message || "OTP verification failed",
    });
  }
};

// RESET PASSWORD
export const businessResetPassword = (identifier, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: BUSINESS_RESET_PASSWORD_REQUEST });

    const response = await axios.post(`${BASE_URL}/businessDetails/reset-password`, {
      identifier,
      newPassword,
    });

    dispatch({
      type: BUSINESS_RESET_PASSWORD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: BUSINESS_RESET_PASSWORD_FAILURE,
      payload: error.response?.data?.message || "Password reset failed",
    });
  }
};

// LOGOUT
export const businessLogout = () => (dispatch) => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("seller");
  dispatch({ type: BUSINESS_LOGOUT });
};