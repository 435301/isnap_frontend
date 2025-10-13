// src/redux/actions/roleActions.js
import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";

// Fetch roles
export const fetchRoles = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "FETCH_ROLES_REQUEST" });
    const response = await axios.get(`${BASE_URL}/roles`, getAuthHeaders());
    const rolesArray = Array.isArray(response.data.data.roles) ? response.data.data.roles : [];
    dispatch({
      type: "FETCH_ROLES_SUCCESS",
      payload: rolesArray,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_ROLES_FAILURE",
      payload: error.response?.data?.error || error.message,
    });
  }
};

// Create role
export const createRole = (role) => async (dispatch, getState) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/roles/create`,
      {
        roleTitle: role.roleTitle,
        wingId:role.wingId,
        departmentId:role.departmentId,
        status: role.status,
      },
    getAuthHeaders(false)
    );

    dispatch({ type: "CREATE_ROLE_SUCCESS", payload: response.data });
    toast.success(response?.data.message || "Role created successfully");
    dispatch(fetchRoles());
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Role creation failed");
  }
};

// Update role
export const updateRole = (role) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/roles/update/${role.id}`,
      {
        roleTitle: role.roleTitle,
        wingId:role.wingId,
        departmentId:role.departmentId,
        status: role.status,
      },getAuthHeaders(false)
    );
    dispatch({ type: "UPDATE_ROLE_SUCCESS", payload: response.data });
    toast.success(response?.data.message || "Role created successfully");
    dispatch(fetchRoles());
  } catch (error) {
    toast.error(error.response.data.message || "Role update failed");
    throw error.response?.data || error;
  }
};

// Delete role
export const deleteRole = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const token = auth?.token || localStorage.getItem("token");
    if (!id) throw new Error("No role id provided");

    const url = `${BASE_URL}/roles/delete/${id}`;
    const res = await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: "DELETE_ROLE_SUCCESS", payload: id });
    
    dispatch(fetchRoles());
  } catch (error) {
    toast.error(error.response.data.message || "Role delete failed");
    throw error.response?.data || error;
  }
};

// Clear messages
export const clearSuccessMessage = () => ({ type: "CLEAR_SUCCESS_MESSAGE" });
