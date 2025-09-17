import axios from "axios";
import BASE_URL from "../../config/config";

// Action Types
export const FETCH_DEPARTMENTS_REQUEST = "FETCH_DEPARTMENTS_REQUEST";
export const FETCH_DEPARTMENTS_SUCCESS = "FETCH_DEPARTMENTS_SUCCESS";
export const FETCH_DEPARTMENTS_FAILURE = "FETCH_DEPARTMENTS_FAILURE";
export const CREATE_DEPARTMENT_SUCCESS = "CREATE_DEPARTMENT_SUCCESS"; // 👈 Add this
export const UPDATE_DEPARTMENT_SUCCESS = "UPDATE_DEPARTMENT_SUCCESS";
export const DELETE_DEPARTMENT_SUCCESS = "DELETE_DEPARTMENT_SUCCESS";
export const DEPARTMENT_ERROR = "DEPARTMENT_ERROR";
export const CLEAR_DEPARTMENT_SUCCESS_MESSAGE = "CLEAR_DEPARTMENT_SUCCESS_MESSAGE";

// Auth Headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token
    ? { headers: { Authorization: `Bearer ${token.trim()}`, "Content-Type": "application/json" } }
    : {};
};

// Fetch Departments
// Fetch Departments
export const fetchDepartments = (page = 1, limit = 10, search = "", showStatus = "") => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DEPARTMENTS_REQUEST });

    try {
      let validShowStatus = "";
      if (showStatus === 0 || showStatus === 1) validShowStatus = showStatus;

      const response = await axios.post(
        `${BASE_URL}/department/list`,
        { page, limit, search, showStatus: validShowStatus },
        getAuthHeaders()
      );

      if (response.data.status) {
        const { Departments = [], totalPages = 1, currentPage = 1 } = response.data.data || {};

        const mappedDepartments = (Departments || []).map((dept) => ({
          ...dept,
          departmentName: dept?.DepartmentName || dept?.name || "", // ✅ safe access
        }));

        dispatch({
          type: FETCH_DEPARTMENTS_SUCCESS,
          payload: { departments: mappedDepartments, currentPage, totalPages },
        });
      } else {
        dispatch({ type: FETCH_DEPARTMENTS_FAILURE, payload: response.data.message });
      }
    } catch (error) {
      dispatch({
        type: FETCH_DEPARTMENTS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};


// Update Department
export const updateDepartment = (departmentData) => async (dispatch) => {
  try {
    const { id, DepartmentName, status } = departmentData;
    const response = await axios.put(
      `${BASE_URL}/department/update/${id}`,
      { name: DepartmentName, status },
      getAuthHeaders()
    );

    if (response.data.status) {
      dispatch({ type: UPDATE_DEPARTMENT_SUCCESS, payload: departmentData });
    } else {
      // Reject with message so component can handle
      return Promise.reject({
        response: { data: { message: response.data.message } },
      });
    }
  } catch (error) {
    dispatch({ type: DEPARTMENT_ERROR, payload: error.response?.data?.message || error.message });
    return Promise.reject(error); // propagate error
  }
};

// Create Department
export const createDepartment = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/department/create`,
      data,
      getAuthHeaders()
    );

    if (response.data.status) {
      // Map the response data to use consistent property names
      const department = {
        ...response.data.data,
        departmentName: response.data.data?.name || response.data.data?.DepartmentName || "",
      };
      dispatch({
        type: CREATE_DEPARTMENT_SUCCESS,
        payload: department,
      });
      return response.data;
    } else {
      return Promise.reject({
        message: response.data.message,
        data: response.data.data || null,
      });
    }
  } catch (error) {
    dispatch({
      type: DEPARTMENT_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    return Promise.reject({
      message: error.response?.data?.message || error.message,
    });
  }
};


// Delete Department
export const deleteDepartment = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/department/delete/${id}`, getAuthHeaders());
    dispatch({ type: DELETE_DEPARTMENT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DEPARTMENT_ERROR, payload: error.response?.data?.message || error.message });
    throw error;
  }
};

// Clear success message
export const clearDepartmentSuccessMessage = () => ({ type: CLEAR_DEPARTMENT_SUCCESS_MESSAGE });
