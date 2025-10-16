import axios from "axios";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";

export const SEND_EMAIL_REQUEST = "SEND_EMAIL_REQUEST";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILURE = "SEND_EMAIL_FAILURE";

export const sendWelcomeEmail = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: SEND_EMAIL_REQUEST });
    const response = await axios.post( `${BASE_URL}/email/send`, { name, email } );
    dispatch({
      type: SEND_EMAIL_SUCCESS,
      payload: response.data,
    });

    toast.success( response.data.message || "Welcome email sent successfully!");
  } catch (error) {
    console.error("Error sending welcome email:", error);
    dispatch({
      type: SEND_EMAIL_FAILURE,
      payload: error.response?.data?.message || "Failed to send email",
    });
    toast.error(error.response?.data?.message || "Failed to send welcome email.");
  }
};