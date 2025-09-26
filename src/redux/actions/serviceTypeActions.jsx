import axios from "axios";
import BASE_URL from "../../config/config";

// Action Types
export const FETCH_SERVICE_TYPES_REQUEST = "FETCH_SERVICE_TYPES_REQUEST";
export const FETCH_SERVICE_TYPES_SUCCESS = "FETCH_SERVICE_TYPES_SUCCESS";
export const FETCH_SERVICE_TYPES_FAILURE = "FETCH_SERVICE_TYPES_FAILURE";
export const CREATE_SERVICE_TYPE_SUCCESS = "CREATE_SERVICE_TYPE_SUCCESS";
export const UPDATE_SERVICE_TYPE_SUCCESS = "UPDATE_SERVICE_TYPE_SUCCESS";
export const DELETE_SERVICE_TYPE_SUCCESS = "DELETE_SERVICE_TYPE_SUCCESS";
export const SERVICE_TYPE_ERROR = "SERVICE_TYPE_ERROR";
export const CLEAR_SERVICE_TYPE_SUCCESS_MESSAGE = "CLEAR_SERVICE_TYPE_SUCCESS_MESSAGE";

// Auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token
    ? { headers: { Authorization: `Bearer ${token.trim()}`, "Content-Type": "application/json" } }
    : {};
};

// ------------------------ FETCH SERVICE TYPES ------------------------
export const fetchServiceTypes = (page = 1, limit = 10, search = "", status = "", marketPlaceId = "") => async (dispatch) => {
  dispatch({ type: FETCH_SERVICE_TYPES_REQUEST });
  try {
    const validShowStatus = status === 0 || status === 1 ? status : "";

    const response = await axios.post(
      `${BASE_URL}/serviceType/list`,
      {
        page,
        limit,
        search,
        marketPlaceId,
        showStatus: validShowStatus,
      },
      getAuthHeaders()
    );

    if (response.data.status) {
      const { serviceTypes, totalPages, currentPage } = response.data.data || {};
      const mappedServices = (serviceTypes || []).map((s) => ({
        ...s,
        status: Number(s.status), // ensure 0 or 1
      }));

      dispatch({
        type: FETCH_SERVICE_TYPES_SUCCESS,
        payload: { serviceTypes: mappedServices, totalPages, currentPage },
      });
    } else {
      dispatch({
        type: FETCH_SERVICE_TYPES_FAILURE,
        payload: response.data.message || "Failed to fetch services",
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_SERVICE_TYPES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createServiceType = (serviceData) => async (dispatch) => {
  try {
    const payload = {
      marketPlaceId: Number(serviceData.marketPlaceId), // ✅ ensure numeric
      serviceType: serviceData.serviceTypeName,         // ✅ backend expects "serviceType"
      price: Number(serviceData.price),
      status: Number(serviceData.status),
    };

    const response = await axios.post(
      `${BASE_URL}/serviceType/create`,
      payload,
      getAuthHeaders()
    );

    const { status, data, message } = response.data;

    if (status) {
      const mappedService = {
        ...data,
        status: Number(data?.status),
      };
      dispatch({ type: CREATE_SERVICE_TYPE_SUCCESS, payload: mappedService });
      return mappedService;
    } else {
      throw new Error(message || "Failed to create service type");
    }
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    throw new Error(msg);
  }
};
// ------------------------ UPDATE SERVICE TYPE ------------------------
export const updateServiceType = (serviceData) => async (dispatch) => {
  try {
    if (!serviceData.id) throw new Error("Missing ID for update");

    const payload = {
      marketPlaceId: serviceData.marketPlaceId,
      serviceType: serviceData.serviceTypeName || serviceData.serviceName,
      price: serviceData.price,
      status: Number(serviceData.status), // 0 or 1
    };

    const response = await axios.put(
      `${BASE_URL}/serviceType/update/${serviceData.id}`,
      payload,
      getAuthHeaders()
    );

    const { status, data, message } = response.data;

    if (status || message === "Service Type updated successfully") {
      const mappedService = {
        ...data,
        status: Number(data?.status),
      };
      dispatch({ type: UPDATE_SERVICE_TYPE_SUCCESS, payload: mappedService });
      return mappedService;
    } else {
      dispatch({ type: SERVICE_TYPE_ERROR, payload: message || "Failed to update service type" });
      throw new Error(message || "Failed to update service type");
    }
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    dispatch({ type: SERVICE_TYPE_ERROR, payload: msg });
    throw error;
  }
};

// ------------------------ DELETE SERVICE TYPE ------------------------
export const deleteServiceType = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/serviceType/delete/${id}`, getAuthHeaders());
    dispatch({ type: DELETE_SERVICE_TYPE_SUCCESS, payload: id });
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    dispatch({ type: SERVICE_TYPE_ERROR, payload: msg });
    throw error;
  }
};

// ------------------------ CLEAR SUCCESS MESSAGE ------------------------
export const clearServiceTypeSuccessMessage = () => ({
  type: CLEAR_SERVICE_TYPE_SUCCESS_MESSAGE,
});
