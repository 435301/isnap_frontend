import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";

export const FETCH_MARKETPLACE_TASKS_REQUEST = "FETCH_MARKETPLACE_TASKS_REQUEST";
export const FETCH_MARKETPLACE_TASKS_SUCCESS = "FETCH_MARKETPLACE_TASKS_SUCCESS";
export const FETCH_MARKETPLACE_TASKS_FAILURE = "FETCH_MARKETPLACE_TASKS_FAILURE";

// Executives
export const FETCH_EXECUTIVES_REQUEST = "FETCH_EXECUTIVES_REQUEST";
export const FETCH_EXECUTIVES_SUCCESS = "FETCH_EXECUTIVES_SUCCESS";
export const FETCH_EXECUTIVES_FAILURE = "FETCH_EXECUTIVES_FAILURE";

// Update Priority
export const UPDATE_PRIORITY_REQUEST = "UPDATE_PRIORITY_REQUEST";
export const UPDATE_PRIORITY_SUCCESS = "UPDATE_PRIORITY_SUCCESS";
export const UPDATE_PRIORITY_FAILURE = "UPDATE_PRIORITY_FAILURE";

// Accept Task
export const ACCEPT_TASK_REQUEST = "ACCEPT_TASK_REQUEST";
export const ACCEPT_TASK_SUCCESS = "ACCEPT_TASK_SUCCESS";
export const ACCEPT_TASK_FAILURE = "ACCEPT_TASK_FAILURE";

export const REJECT_TASK_REQUEST = "REJECT_TASK_REQUEST";
export const REJECT_TASK_SUCCESS = "REJECT_TASK_SUCCESS";
export const REJECT_TASK_FAILURE = "REJECT_TASK_FAILURE";

// Move Task
export const MOVE_TASK_REQUEST = "MOVE_TASK_REQUEST";
export const MOVE_TASK_SUCCESS = "MOVE_TASK_SUCCESS";
export const MOVE_TASK_FAILURE = "MOVE_TASK_FAILURE";

// Assign Task
export const ASSIGN_TASK_REQUEST = "ASSIGN_TASK_REQUEST";
export const ASSIGN_TASK_SUCCESS = "ASSIGN_TASK_SUCCESS";
export const ASSIGN_TASK_FAILURE = "ASSIGN_TASK_FAILURE";


export const fetchTasks = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_MARKETPLACE_TASKS_REQUEST });
    const response = await axios.get(`${BASE_URL}/marketplaceManager/getTasks`, getAuthHeaders());
    dispatch({
      type: FETCH_MARKETPLACE_TASKS_SUCCESS,
      payload: response.data.data || [],
    });
  } catch (error) {
    dispatch({
      type: FETCH_MARKETPLACE_TASKS_FAILURE,
      payload:
        error.response?.data?.message || "Failed to fetch marketplace tasks",
    });
  }
};

//  Get Executives
export const fetchExecutives = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_EXECUTIVES_REQUEST });
    const response = await axios.get(`${BASE_URL}/marketplaceManager/getExecutives`, getAuthHeaders());
    dispatch({ type: FETCH_EXECUTIVES_SUCCESS, payload: response.data.data.executives });
  } catch (error) {
    dispatch({
      type: FETCH_EXECUTIVES_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch executives",
    });
  }
};

// Update Task Priority
export const updatePriority = (taskId, priorityId) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRIORITY_REQUEST });
    const response = await axios.patch(
      `${BASE_URL}/marketplaceManager/updatePriority`,
      { taskId, priorityId },
      getAuthHeaders()
    );
    dispatch({ type: UPDATE_PRIORITY_SUCCESS, payload: response.data.data });
    dispatch(fetchTasks());
    toast.success(response.data.message);
  } catch (error) {
    dispatch({
      type: UPDATE_PRIORITY_FAILURE,
      payload: error.response?.data?.message || "Failed to update priority",
    });
    toast.error(error.response?.data?.message);
  }
};

//  Accept Task
export const acceptTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: ACCEPT_TASK_REQUEST });
    const response = await axios.patch(
      `${BASE_URL}/marketplaceManager/acceptTask`,
      { taskId },
      getAuthHeaders()
    );
    dispatch({ type: ACCEPT_TASK_SUCCESS, payload: response.data.data });
    toast.success(response.data.message);
  } catch (error) {
    dispatch({
      type: ACCEPT_TASK_FAILURE,
      payload: error.response?.data?.message || "Failed to accept task",
    });
    toast.error(error.response?.data?.message);
  }
};

export const rejectTask = (taskId, reason) => async (dispatch) => {
  try {
    dispatch({ type: REJECT_TASK_REQUEST });
    const response = await axios.patch(`${BASE_URL}/marketplaceManager/rejectTask`, { taskId, reason }, getAuthHeaders());
    dispatch({
      type: REJECT_TASK_SUCCESS,
      payload: response.data.data,
    });
    toast.success(response.data.message);
  } catch (error) {
    const message = error.response?.data?.message || "Failed to reject task";
    dispatch({
      type: REJECT_TASK_FAILURE,
      payload: message,
    });
    toast.error(message);
  }
};

export const moveTask = (taskId, status) => async (dispatch) => {
  try {
    dispatch({ type: MOVE_TASK_REQUEST });
    const response = await axios.patch(`${BASE_URL}/marketplaceManager/moveTask`, { taskId, status }, getAuthHeaders());
    dispatch({
      type: MOVE_TASK_SUCCESS,
      payload: response.data.data,
    });
    toast.success(response.data.message);
  } catch (error) {
    dispatch({
      type: MOVE_TASK_FAILURE,
      payload: error.response?.data?.message,
    });
    toast.error(error.response?.data?.message);
  }
};

export const assignTask = (taskId, executiveId, reason) => async (dispatch) => {
  try {
    dispatch({ type: ASSIGN_TASK_REQUEST });
    const response = await axios.patch(`${BASE_URL}/marketplaceManager/assignTask`, { taskId, executiveId, reason }, getAuthHeaders());
    dispatch({
      type: ASSIGN_TASK_SUCCESS,
      payload: response.data.data,
    });
    dispatch(fetchTasks());
    toast.success(response.data.message);
  } catch (error) {
    dispatch({
      type: ASSIGN_TASK_FAILURE,
      payload: error.response?.data?.message,
    });
    toast.error(error.response?.data?.message);
  }
};