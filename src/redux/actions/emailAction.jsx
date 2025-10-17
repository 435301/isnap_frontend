import axios from "axios";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";
import getSellerAuthHeaders from "../../utils/sellerAuth";
import getAuthHeaders from "../../utils/auth";

export const SEND_EMAIL_REQUEST = "SEND_EMAIL_REQUEST";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILURE = "SEND_EMAIL_FAILURE";

export const EMAIL_REQUEST = "EMAIL_REQUEST";
export const EMAIL_SUCCESS = "EMAIL_SUCCESS";
export const EMAIL_FAILURE = "EMAIL_FAILURE";

export const SELLER_EMAIL_REQUEST = "SELLER_EMAIL_REQUEST";
export const SELLER_EMAIL_SUCCESS = "SELLER_EMAIL_SUCCESS";
export const SELLER_EMAIL_FAILURE = "SELLER_EMAIL_FAILURE";

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

const sendEmail = (url, businessId) => async (dispatch) => {
  try {
    dispatch({ type: EMAIL_REQUEST });
    const response = await axios.post(`${BASE_URL}${url}`, { businessId }, getAuthHeaders(false));
    dispatch({
      type: EMAIL_SUCCESS,
      payload: response.data.message,
    });
    toast.success(response.data.message);
  } catch (error) {
    dispatch({
      type: EMAIL_FAILURE,
      payload: error.response?.data?.message || "Failed to send email",
    });
    toast.error(error.response?.data?.message || "Failed to send email.");
  }
};

 export const mailToSalesDepartment = (businessId) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_EMAIL_REQUEST });
    const response = await axios.post(`${BASE_URL}/email/mailToSalesDepartment`, { businessId } , getSellerAuthHeaders(false));
    dispatch({
      type: SELLER_EMAIL_SUCCESS,
      payload: response.data.message,
    });
    toast.success(response.data.message);
  } catch (error) {
    dispatch({
      type: SELLER_EMAIL_FAILURE,
      payload: error.response?.data?.message || "Failed to send email",
    });
    toast.error(error.response?.data?.message || "Failed to send email.");
  }
};

// Export individual actions
export const mailToSalesManager = (businessId) =>
  sendEmail("/email/mailToSalesManager", businessId);

export const approveMailToSeller = (businessId) =>
  sendEmail("/email/approveMailToSeller", businessId);

export const rejectMailToSeller = (businessId) =>
  sendEmail("/email/rejectMailToSeller", businessId);