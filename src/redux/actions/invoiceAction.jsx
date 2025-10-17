import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";

export const REQUEST_INVOICE_REQUEST = "REQUEST_INVOICE_REQUEST";
export const REQUEST_INVOICE_SUCCESS = "REQUEST_INVOICE_SUCCESS";
export const REQUEST_INVOICE_FAILURE = "REQUEST_INVOICE_FAILURE";

export const UPLOAD_INVOICE_REQUEST = "UPLOAD_INVOICE_REQUEST";
export const UPLOAD_INVOICE_SUCCESS = "UPLOAD_INVOICE_SUCCESS";
export const UPLOAD_INVOICE_FAILURE = "UPLOAD_INVOICE_FAILURE";

export const requestInvoice = (businessId) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_INVOICE_REQUEST });

    const { data } = await axios.patch( `${BASE_URL}/salesManager/requestForInvoice`, { businessId },  getAuthHeaders(false));
    dispatch({ type: REQUEST_INVOICE_SUCCESS, payload: data.data });
    toast.success(data.message || "Requested for invoice successfully");
    return data.data;
  } catch (error) {
    dispatch({
      type: REQUEST_INVOICE_FAILURE,
      payload: error.response?.data?.message || "Failed to request invoice",
    });
    toast.error(error.response?.data?.message || "Failed to request invoice");
  }
};

// Upload Invoice (Accounts Manager)
export const uploadInvoice = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_INVOICE_REQUEST });
    const { data } = await axios.post( `${BASE_URL}/accountsManager/uploadInvoice`,  formData, getAuthHeaders(true)  );
    dispatch({ type: UPLOAD_INVOICE_SUCCESS, payload: data.data });
    toast.success(data.message || "Invoice uploaded successfully");
    return data.data;
  } catch (error) {
    dispatch({
      type: UPLOAD_INVOICE_FAILURE,
      payload: error.response?.data?.message || "Failed to upload invoice",
    });
    toast.error(error.response?.data?.message || "Failed to upload invoice");
  }
};
