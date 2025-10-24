import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";
import getSellerAuthHeaders from "../../utils/sellerAuth";

export const REQUEST_INVOICE_REQUEST = "REQUEST_INVOICE_REQUEST";
export const REQUEST_INVOICE_SUCCESS = "REQUEST_INVOICE_SUCCESS";
export const REQUEST_INVOICE_FAILURE = "REQUEST_INVOICE_FAILURE";

export const UPLOAD_INVOICE_REQUEST = "UPLOAD_INVOICE_REQUEST";
export const UPLOAD_INVOICE_SUCCESS = "UPLOAD_INVOICE_SUCCESS";
export const UPLOAD_INVOICE_FAILURE = "UPLOAD_INVOICE_FAILURE";

export const CREATE_INVOICE_REQUEST = "CREATE_INVOICE_REQUEST";
export const CREATE_INVOICE_SUCCESS = "CREATE_INVOICE_SUCCESS";
export const CREATE_INVOICE_FAILURE = "CREATE_INVOICE_FAILURE";

export const GET_INVOICE_SERVICES_REQUEST = "GET_INVOICE_SERVICES_REQUEST";
export const GET_INVOICE_SERVICES_SUCCESS = "GET_INVOICE_SERVICES_SUCCESS";
export const GET_INVOICE_SERVICES_FAILURE = "GET_INVOICE_SERVICES_FAILURE";

export const FETCH_INVOICES_REQUEST = "FETCH_INVOICES_REQUEST";
export const FETCH_INVOICES_SUCCESS = "FETCH_INVOICES_SUCCESS";
export const FETCH_INVOICES_FAILURE = "FETCH_INVOICES_FAILURE";

export const FETCH_INVOICES_REQUEST_ACCOUNTS = "FETCH_INVOICES_REQUEST_ACCOUNTS";
export const FETCH_INVOICES_SUCCESS_ACCOUNTS = "FETCH_INVOICES_SUCCESS_ACCOUNTS";
export const FETCH_INVOICES_FAILURE_ACCOUNTS = "FETCH_INVOICES_FAILURE_ACCOUNTS";


export const requestInvoice = (businessId) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_INVOICE_REQUEST });

    const { data } = await axios.patch(`${BASE_URL}/salesManager/requestForInvoice`, { businessId }, getAuthHeaders(false));
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
    const { data } = await axios.post(`${BASE_URL}/accountsManager/uploadInvoice`, formData, getAuthHeaders(true));
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


export const createInvoice = (invoiceData) => async (dispatch) => {
  dispatch({ type: CREATE_INVOICE_REQUEST });

  try {
    const response = await axios.post(`${BASE_URL}/accountsManager/createInvoice`, invoiceData, getAuthHeaders());
    if (response.data.status) {
      dispatch({
        type: CREATE_INVOICE_SUCCESS,
        payload: response.data.data, // contains invoiceDate and invoiceNumber
      });
      toast.success(response.data.message || "Invoice created successfully");
    }
    return response.data.data;
  } catch (error) {
    dispatch({
      type: CREATE_INVOICE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Failed to create invoice");
  }
};


export const fetchInvoiceServices = (invoiceNumber) => {
  return async (dispatch) => {
    dispatch({ type: GET_INVOICE_SERVICES_REQUEST });
    try {
      const response = await axios.post(`${BASE_URL}/accountsManager/getInvoiceServices`, {
        invoiceNumber,
      }, getAuthHeaders());
      dispatch({
        type: GET_INVOICE_SERVICES_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: GET_INVOICE_SERVICES_FAILURE,
        payload: error,
      });
    }
  };
};

export const fetchInvoiceSeller = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_INVOICES_REQUEST });
    try {
      const response = await axios.get(`${BASE_URL}/mou/invoices`, getSellerAuthHeaders());
      dispatch({
        type: FETCH_INVOICES_SUCCESS,
        payload: response.data.data
      });
    } catch (error) {
      dispatch({
        type: FETCH_INVOICES_FAILURE,
        payload: error,
      });
    }
  };
};


export const fetchInvoiceAccounts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_INVOICES_REQUEST_ACCOUNTS });
    try {
      const response = await axios.get(`${BASE_URL}/accountsManager/invoices`, getSellerAuthHeaders());
      dispatch({
        type: FETCH_INVOICES_SUCCESS_ACCOUNTS,
        payload: response.data.data
      });
    } catch (error) {
      dispatch({
        type: FETCH_INVOICES_FAILURE_ACCOUNTS,
        payload: error,
      });
    }
  };
};