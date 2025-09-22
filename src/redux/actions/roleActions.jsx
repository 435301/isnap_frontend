// src/redux/actions/roleActions.js
import axios from "axios";
import BASE_URL from "../../config/config";

// Fetch roles
export const fetchRoles = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "FETCH_ROLES_REQUEST" });
    const { auth } = getState();
    const token = auth?.token || localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/roles`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const rolesArray = Array.isArray(response.data.data) ? response.data.data : [];

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
    const { auth } = getState();
    const token = auth?.token || localStorage.getItem("token");

    const response = await axios.post(
      `${BASE_URL}/roles/create`,
      {
        roleTitle: role.roleTitle,
        task: role.task,
        status: role.status,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch({ type: "CREATE_ROLE_SUCCESS", payload: response.data });
    dispatch({ type: "SET_SUCCESS_MESSAGE", payload: "Role created successfully!" });
    dispatch(fetchRoles());
    return response.data;

  } catch (error) {
    // Backend validation errors (array of {msg})
    if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
      const firstErrorMsg = error.response.data.errors[0].msg;
      dispatch({ type: "SET_ERROR_MESSAGE", payload: firstErrorMsg });
      return Promise.reject(firstErrorMsg);
    }

    // Other backend messages
    const errMsg = error.response?.data?.msg || error.message || "Something went wrong";
    dispatch({ type: "SET_ERROR_MESSAGE", payload: errMsg });
    return Promise.reject(errMsg);
  }
};

// Update role
export const updateRole = (role) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const token = auth?.token || localStorage.getItem("token");
    const response = await axios.put(
      `${BASE_URL}/roles/update/${role.id}`,
      {
        roleTitle: role.roleTitle,
        task: role.task,
        status: role.status,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "UPDATE_ROLE_SUCCESS", payload: response.data });
    dispatch({ type: "SET_SUCCESS_MESSAGE", payload: "Role updated successfully!" });
    dispatch(fetchRoles());
  } catch (error) {
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
    dispatch({
      type: "SET_SUCCESS_MESSAGE",
      payload: res.data?.message || "Role deleted successfully!",
    });

    dispatch(fetchRoles());
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Clear messages
export const clearSuccessMessage = () => ({ type: "CLEAR_SUCCESS_MESSAGE" });
