import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";

export const FETCH_LEADS_REQUEST = "FETCH_LEADS_REQUEST";
export const FETCH_LEADS_SUCCESS = "FETCH_LEADS_SUCCESS";
export const FETCH_LEADS_FAILURE = "FETCH_LEADS_FAILURE";

export const CREATE_LEAD_REQUEST = "CREATE_LEAD_REQUEST";
export const CREATE_LEAD_SUCCESS = "CREATE_LEAD_SUCCESS";
export const CREATE_LEAD_FAILURE = "CREATE_LEAD_FAILURE";

export const UPDATE_LEAD_REQUEST = "UPDATE_LEAD_REQUEST";
export const UPDATE_LEAD_SUCCESS = "UPDATE_LEAD_SUCCESS";
export const UPDATE_LEAD_FAILURE = "UPDATE_LEAD_FAILURE";

export const DELETE_LEAD_REQUEST = "DELETE_LEAD_REQUEST";
export const DELETE_LEAD_SUCCESS = "DELETE_LEAD_SUCCESS";
export const DELETE_LEAD_FAILURE = "DELETE_LEAD_FAILURE";

export const FETCH_LEAD_BY_ID_REQUEST = "FETCH_LEAD_BY_ID_REQUEST";
export const FETCH_LEAD_BY_ID_SUCCESS = "FETCH_LEAD_BY_ID_SUCCESS";
export const FETCH_LEAD_BY_ID_FAILURE = "FETCH_LEAD_BY_ID_FAILURE";

export const CHECK_MOBILE_REQUEST = "CHECK_MOBILE_REQUEST";
export const CHECK_MOBILE_SUCCESS = "CHECK_MOBILE_SUCCESS";
export const CHECK_MOBILE_FAILURE = "CHECK_MOBILE_FAILURE";

export const FETCH_SALES_TEAM_LEADS_REQUEST = "FETCH_SALES_TEAM_LEADS_REQUEST";
export const FETCH_SALES_TEAM_LEADS_SUCCESS = "FETCH_SALES_TEAM_LEADS_SUCCESS";
export const FETCH_SALES_TEAM_LEADS_FAILURE = "FETCH_SALES_TEAM_LEADS_FAILURE";


// List Leads
export const fetchLeads = (payload = { search: "", page: 1, showStatus: "" }) => async (dispatch) => {
    dispatch({ type: FETCH_LEADS_REQUEST });
    try {
        const res = await axios.post(`${BASE_URL}/lead/list`, payload, getAuthHeaders());
        dispatch({ type: FETCH_LEADS_SUCCESS, payload: res.data.data });
    } catch (error) {
        dispatch({ type: FETCH_LEADS_FAILURE, payload: error.message });
    }
};

// Create Lead
export const createLead = (leadData) => async (dispatch) => {
    dispatch({ type: CREATE_LEAD_REQUEST });
    try {
        const response = await axios.post(`${BASE_URL}/lead/create`, leadData, getAuthHeaders(false));
        dispatch({ type: CREATE_LEAD_SUCCESS, payload: response.data });
        dispatch(fetchLeads({ search: "", page: 1, showStatus: "" }));
        toast.success(response?.data.message);
        return response.data;
    } catch (error) {
        dispatch({ type: CREATE_LEAD_FAILURE, payload: error.message });
        toast.error(error.response.data.message);
    }
};

// Update Lead
export const updateLead = (id, leadData) => async (dispatch) => {
    dispatch({ type: UPDATE_LEAD_REQUEST });
    try {
        const res = await axios.put(`${BASE_URL}/lead/update/${id}`, leadData, getAuthHeaders(false));
        dispatch({ type: UPDATE_LEAD_SUCCESS, payload: res.data });
        dispatch(fetchLeads({ search: "", page: 1, showStatus: "" }));
        toast.success(res?.data.message);
    } catch (error) {
        dispatch({ type: UPDATE_LEAD_FAILURE, payload: error.message });
        toast.error(error.response.data.message);
    }
};

// Delete Lead
export const deleteLead = (id) => async (dispatch) => {
    dispatch({ type: DELETE_LEAD_REQUEST });
    try {
        const res = await axios.delete(`${BASE_URL}/lead/delete/${id}`, getAuthHeaders());
        dispatch({ type: DELETE_LEAD_SUCCESS, payload: id });
        toast.success(res?.data.message)
    } catch (error) {
        dispatch({ type: DELETE_LEAD_FAILURE, payload: error.message });
        toast.error(error.response.data.message);
    }
};

// Fetch Lead By ID
export const fetchLeadById = (id) => async (dispatch) => {
    dispatch({ type: FETCH_LEAD_BY_ID_REQUEST });
    try {
        const res = await axios.get(`${BASE_URL}/lead/${id}`, getAuthHeaders());
        console.log("API response:", res.data);
        dispatch({ type: FETCH_LEAD_BY_ID_SUCCESS, payload: res.data.data });
    } catch (error) {
        dispatch({ type: FETCH_LEAD_BY_ID_FAILURE, payload: error.message });
    }
};

// Check Mobile Number
export const checkMobile = (mobileNumber) => async (dispatch) => {
    dispatch({ type: CHECK_MOBILE_REQUEST });
    try {
        const res = await axios.post(`${BASE_URL}/lead/checkMobile`, { mobileNumber }, getAuthHeaders(false));
        dispatch({ type: CHECK_MOBILE_SUCCESS, payload: res.data.data });
    } catch (error) {
        dispatch({ type: CHECK_MOBILE_FAILURE, payload: error.message });
        toast.error(error.response.data.message);
    }
};

// List Leads fro sales team
export const fetchLeadsSalesTeam = (payload = { search: "", page: 1, showStatus: "" }) => async (dispatch) => {
    dispatch({ type: FETCH_SALES_TEAM_LEADS_FAILURE });
    try {
        const res = await axios.post(`${BASE_URL}/lead/getLeads`, payload, getAuthHeaders());
        dispatch({ type: FETCH_SALES_TEAM_LEADS_REQUEST, payload: res.data.data });
    } catch (error) {
        dispatch({ type: FETCH_SALES_TEAM_LEADS_SUCCESS, payload: error.message });
    }
};