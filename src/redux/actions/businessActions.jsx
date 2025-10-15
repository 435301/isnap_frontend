import axios from "axios";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";

export const FETCH_BUSINESS_REQUEST = "FETCH_BUSINESS_REQUEST";
export const FETCH_BUSINESS_SUCCESS = "FETCH_BUSINESS_SUCCESS";
export const FETCH_BUSINESS_FAILURE = "FETCH_BUSINESS_FAILURE";
export const UPDATE_BUSINESS_SUCCESS = "UPDATE_BUSINESS_SUCCESS";
export const DELETE_BUSINESS_SUCCESS = "DELETE_BUSINESS_SUCCESS";
export const CREATE_BUSINESS_SUCCESS = "CREATE_BUSINESS_SUCCESS";
export const BUSINESS_ERROR = "BUSINESS_ERROR";
export const CLEAR_BUSINESS_SUCCESS_MESSAGE = "CLEAR_BUSINESS_SUCCESS_MESSAGE";
export const ADD_REQUIRED_DOCUMENTS_REQUEST = "ADD_REQUIRED_DOCUMENTS_REQUEST";
export const ADD_REQUIRED_DOCUMENTS_SUCCESS = "ADD_REQUIRED_DOCUMENTS_SUCCESS";
export const ADD_REQUIRED_DOCUMENTS_FAILURE = "ADD_REQUIRED_DOCUMENTS_FAILURE";


const getAuthHeaders = (isFormData = false) => {
  const token = localStorage.getItem("authToken");
  if (!token) return {};

  return {
    headers: {
      Authorization: `Bearer ${token.trim()}`,
      ...(isFormData ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" }),
    },
  };
};

// Fetch businesses list
export const fetchBusinessDetails = (page=1 , limit , search = "", showStatus = "") => {
  return async (dispatch) => {
    dispatch({ type: FETCH_BUSINESS_REQUEST });
    try {
      const response = await axios.post(
        `${BASE_URL}/businessDetails/list`,
        { page, limit, search, showStatus },
        getAuthHeaders()
      );

      if (response.data.status) {
        const {
          businessDetails = [], totalPages = 1,currentPage = 1,total = 0, limit = 10,} = response.data.data || {};
        const mappedBusinesses = businessDetails.map((biz) => ({
          id: biz.id,
          businessName: biz.businessName,
          sellerName: biz.sellerName,
          regdEmail: biz.regdEmail,
          regdMobile: biz.regdMobile,
          spocName: biz.spocName,
          spocMobile: biz.spocMobile,
          stateName: biz.stateName,
          cityName: biz.cityName,
          gstNumber: biz.gstNumber,
          referredBy: biz.referredBy,
          address: biz.address,
          businessLogo: biz.businessLogo,
          status: biz.status,
        }));

        dispatch({
          type: FETCH_BUSINESS_SUCCESS,
          payload: { businesses: mappedBusinesses, currentPage, totalPages, limit},
        });
      } else {
        dispatch({
          type: FETCH_BUSINESS_FAILURE,
          payload: response.data.message || "Failed to fetch businesses",
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_BUSINESS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

// Fetch single business by ID
export const fetchBusinessDetailsById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_BUSINESS_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/businessDetails/${id}`, getAuthHeaders());
    if (response.data.status) {
      const biz = response.data.data || {};
      const mappedBusiness = {
        id: biz.id,
        leadId: biz.leadId,
        businessName: biz.businessName,
        sellerName: biz.sellerName,
        regdEmail: biz.regdEmail,
        regdMobile: biz.regdMobile,
        spocName: biz.spocName,
        spocMobile: biz.spocMobile,
        stateId: biz.stateId,
        stateName: biz.stateName,
        cityName: biz.cityName,
        gstNumber: biz.gstNumber,
        referredBy: biz.referredBy,
        address: biz.address,
        businessLogo: biz.businessLogo,
        status: biz.status,
        serviceRows: biz.serviceRows || [],
        catalogRows: biz.catalogRows || [],
        keyAccountRows: biz.keyAccountRows || [],
      };
      dispatch({
        type: FETCH_BUSINESS_SUCCESS,
        payload: { businesses: [mappedBusiness], currentPage: 1, totalPages: 1 },
      });
    } else {
      dispatch({
        type: FETCH_BUSINESS_FAILURE,
        payload: response.data.message || "Failed to fetch business",
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_BUSINESS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create business
export const createBusiness = (businessData) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/businessDetails/create`,
      businessData,
      getAuthHeaders(true)
    );

    if (response.data.status) {
      dispatch({ type: CREATE_BUSINESS_SUCCESS, payload: response.data.data || {} });
     dispatch(fetchBusinessDetails());
     toast.success(response.data.message || "Business created successfully!");
      return response.data;
    } else {
      dispatch({ type: BUSINESS_ERROR, payload: response.data.message });
      throw new Error(response.data.message);
    }

  } catch (error) {
    dispatch({
      type: BUSINESS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Error creating business");
    throw error;
  }
};

// Update business
export const updateBusiness = (businessData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/businessDetails/update/${businessData.get("id")}`,
      businessData,
      getAuthHeaders(true)
    );

    if (response.data.status) {
      dispatch({ type: UPDATE_BUSINESS_SUCCESS, payload: response.data.data || {} });
     dispatch(fetchBusinessDetails());
     toast.success(response.data.message || "Business updated successfully!");
      return response.data;
    } else {
      dispatch({ type: BUSINESS_ERROR, payload: response.data.message });
      throw new Error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: BUSINESS_ERROR, payload: error.response?.data?.message || error.message });
    toast.error(error.response?.data?.message || "Error creating business");
    throw error;
  }
};

// Delete business
export const deleteBusiness = (id) => async (dispatch) => {
  try {
   const response =  await axios.delete(`${BASE_URL}/businessDetails/delete/${id}`, getAuthHeaders());
    dispatch({ type: DELETE_BUSINESS_SUCCESS, payload: id });
     dispatch(fetchBusinessDetails());
     toast.success(response?.data?.message || "Business deleted successfully!");
  } catch (error) {
    dispatch({ type: BUSINESS_ERROR, payload: error.response?.data?.message || error.message });
    throw error;
  }
};

// Clear success message
export const clearBusinessSuccessMessage = () => ({ type: CLEAR_BUSINESS_SUCCESS_MESSAGE });

export const addRequiredDocuments = (payload) => async (dispatch) => {
  dispatch({ type: ADD_REQUIRED_DOCUMENTS_REQUEST });
  try {
    const { data } = await axios.post(`${BASE_URL}/businessDetails/requiredDocuments`, payload,  getAuthHeaders());
    dispatch({
      type: ADD_REQUIRED_DOCUMENTS_SUCCESS,
      payload: data,
    });

    toast.success(data.message || "Required documents added successfully");
    return data;
  } catch (error) {
    dispatch({
      type: ADD_REQUIRED_DOCUMENTS_FAILURE,
      payload:  error.response?.data?.message,
    });
    toast.error( error.response?.data?.message);
  }
};