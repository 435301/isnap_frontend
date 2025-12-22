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

export const FETCH_MY_TASKS_REQUEST = "FETCH_MY_TASKS_REQUEST";
export const FETCH_MY_TASKS_SUCCESS = "FETCH_MY_TASKS_SUCCESS";
export const FETCH_MY_TASKS_FAILURE = "FETCH_MY_TASKS_FAILURE";


export const FETCH_DM_TASKS_REQUEST = "FETCH_DM_TASKS_REQUEST";
export const FETCH_DM_TASKS_SUCCESS = "FETCH_DM_TASKS_SUCCESS";
export const FETCH_DM_TASKS_FAILURE = "FETCH_DM_TASKS_FAILURE";

export const FETCH_DM_MY_TASKS_REQUEST = "FETCH_DM_MY_TASKS_REQUEST";
export const FETCH_DM_MY_TASKS_SUCCESS = "FETCH_DM_MY_TASKS_SUCCESS";
export const FETCH_DM_MY_TASKS_FAILURE = "FETCH_DM_MY_TASKS_FAILURE";

export const FETCH_PHOTOGRAPHY_TASKS_REQUEST = "FETCH_PHOTOGRAPHY_TASKS_REQUEST";
export const FETCH_PHOTOGRAPHY_TASKS_SUCCESS = "FETCH_PHOTOGRAPHY_TASKS_SUCCESS";
export const FETCH_PHOTOGRAPHY_TASKS_FAILURE = "FETCH_PHOTOGRAPHY_TASKS_FAILURE";

export const FETCH_PHOTOGRAPHY_MY_TASKS_REQUEST = "FETCH_PHOTOGRAPHY_MY_TASKS_REQUEST";
export const FETCH_PHOTOGRAPHY_MY_TASKS_SUCCESS = "FETCH_PHOTOGRAPHY_MY_TASKS_SUCCESS";
export const FETCH_PHOTOGRAPHY_MY_TASKS_FAILURE = "FETCH_PHOTOGRAPHY_MY_TASKS_FAILURE";

export const SEND_TASK_COMMENTS_REQUEST = "SEND_TASK_COMMENTS_REQUEST";
export const SEND_TASK_COMMENTS_SUCCESS = "SEND_TASK_COMMENTS_SUCCESS";
export const SEND_TASK_COMMENTS_FAILURE = "SEND_TASK_COMMENTS_FAILURE";

export const FETCH_TASK_HISTORY_REQUEST = "FETCH_TASK_HISTORY_REQUEST";
export const FETCH_TASK_HISTORY_SUCCESS = "FETCH_TASK_HISTORY_SUCCESS";
export const FETCH_TASK_HISTORY_FAILURE = "FETCH_TASK_HISTORY_FAILURE";

export const CREATE_TASK_REQUEST = "CREATE_TASK_REQUEST";
export const CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS";
export const CREATE_TASK_FAILURE = "CREATE_TASK_FAILURE";

export const PERSONAL_TASKS_REQUEST = "PERSONAL_TASKS_REQUEST";
export const PERSONAL_TASKS_SUCCESS = "PERSONAL_TASKS_SUCCESS";
export const PERSONAL_TASKS_FAILURE = "PERSONAL_TASKS_FAILURE";

export const PERSONAL_TASK_DETAILS_REQUEST = "PERSONAL_TASK_DETAILS_REQUEST"
export const PERSONAL_TASK_DETAILS_SUCCESS = "PERSONAL_TASK_DETAILS_SUCCESS";
export const PERSONAL_TASK_DETAILS_FAILURE = "PERSONAL_TASK_DETAILS_FAILURE";

export const UPDATE_PERSONAL_TASK_PRIORITY_SUCCESS = "UPDATE_PERSONAL_TASK_PRIORITY_SUCCESS";
export const UPDATE_PERSONAL_TASK_STATUS_SUCCESS = "UPDATE_PERSONAL_TASK_STATUS_SUCCESS";

export const DELETE_PERSONAL_TASK_SUCCESS = "DELETE_PERSONAL_TASK_SUCCESS";


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
    dispatch(fetchDigitalMarketingTasks());
    dispatch(fetchDigitalMarketingMyTasks());
    dispatch(fetchPhotographyMyTasks());
    dispatch(fetchPhotographyTasks());
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
    dispatch(fetchTasks());
    dispatch(fetchDigitalMarketingTasks());
    dispatch(fetchDigitalMarketingMyTasks());
    dispatch(fetchPhotographyMyTasks());
    dispatch(fetchPhotographyTasks());
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
    dispatch(fetchDigitalMarketingTasks());
    dispatch(fetchPhotographyMyTasks());
    dispatch(fetchPhotographyTasks());
    toast.success(response.data.message);
  } catch (error) {
    dispatch({
      type: ASSIGN_TASK_FAILURE,
      payload: error.response?.data?.message,
    });
    toast.error(error.response?.data?.message);
  }
};
export const fetchTasksExecutive = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_MY_TASKS_REQUEST });
    const response = await axios.get(`${BASE_URL}/marketplaceExecutive/getMyTasks`, getAuthHeaders());
    dispatch({
      type: FETCH_MY_TASKS_SUCCESS,
      payload: response.data.data || [],
    });
  } catch (error) {
    dispatch({
      type: FETCH_MY_TASKS_FAILURE,
      payload:
        error.response?.data?.message || "Failed to fetch marketplace tasks",
    });
  }
};

export const fetchDigitalMarketingTasks = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_DM_TASKS_REQUEST });
    const response = await axios.get(`${BASE_URL}/digitalMarketingTeam/getTasks`, getAuthHeaders());
    dispatch({
      type: FETCH_DM_TASKS_SUCCESS,
      payload: response.data.data || [],
    });
  } catch (error) {
    console.error("Error fetching DM tasks:", error);
    dispatch({
      type: FETCH_DM_TASKS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//  Fetch logged-in executive's Digital Marketing tasks
export const fetchDigitalMarketingMyTasks = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_DM_MY_TASKS_REQUEST });
    const response = await axios.get(`${BASE_URL}/digitalMarketingTeam/getMyTasks`, getAuthHeaders());
    dispatch({
      type: FETCH_DM_MY_TASKS_SUCCESS,
      payload: response.data.data || [],
    });
  } catch (error) {
    console.error("Error fetching DM executive tasks:", error);
    dispatch({
      type: FETCH_DM_MY_TASKS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const fetchPhotographyTasks = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PHOTOGRAPHY_TASKS_REQUEST });
    const response = await axios.get(`${BASE_URL}/photographyTeam/getTasks`, getAuthHeaders());
    dispatch({
      type: FETCH_PHOTOGRAPHY_TASKS_SUCCESS,
      payload: response.data.data || [],
    });
  } catch (error) {
    dispatch({
      type: FETCH_PHOTOGRAPHY_TASKS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Failed to fetch photography tasks");
  }
};

export const fetchPhotographyMyTasks = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PHOTOGRAPHY_MY_TASKS_REQUEST });
    const response = await axios.get(`${BASE_URL}/photographyTeam/getMyTasks`, getAuthHeaders());
    dispatch({
      type: FETCH_PHOTOGRAPHY_MY_TASKS_SUCCESS,
      payload: response.data.data || [],
    });
  } catch (error) {
    dispatch({
      type: FETCH_PHOTOGRAPHY_MY_TASKS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const sendTaskComments = (taskId, status, comments, file) => async (dispatch) => {
  try {
    dispatch({ type: SEND_TASK_COMMENTS_REQUEST });
    const formData = new FormData();
    formData.append("taskId", taskId);
    formData.append("status", status);
    formData.append("comments", comments);

    if (file) {
      formData.append("file", file);
    }
    const response = await axios.post(`${BASE_URL}/task/sendTaskComments`, formData, getAuthHeaders(true));
    dispatch({
      type: SEND_TASK_COMMENTS_SUCCESS,
      payload: response.data,
    });
    dispatch(fetchTaskHistory(taskId));
    toast.success(response.data.message);
  } catch (error) {
    dispatch({
      type: SEND_TASK_COMMENTS_FAILURE,
      payload: error.response?.data?.message || "Failed to send comments",
    });
    toast.error(error.response?.data?.message || "Failed to send comments");
  }
};

export const fetchTaskHistory = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TASK_HISTORY_REQUEST });
    const response = await axios.get(`${BASE_URL}/task/getTaskHistory/${taskId}`, getAuthHeaders());
    dispatch({
      type: FETCH_TASK_HISTORY_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TASK_HISTORY_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch task history",
    });
  }
};

export const createTask = (taskPayload) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_TASK_REQUEST });
    try {
      const response = await axios.post(`${BASE_URL}/personalTask/create`, taskPayload, getAuthHeaders(false));
      if (response.data.status) {
        dispatch({ type: CREATE_TASK_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: CREATE_TASK_FAILURE, payload: response.data.message });
      }
      toast.success(response.data.message);
      dispatch(fetchPersonalTasks());
    } catch (error) {
      dispatch({
        type: CREATE_TASK_FAILURE,
        payload: error.response?.data?.message || error.message
      });
      toast.error(error.response?.data?.message || error.message);
    }
  };
};

// Get all personal tasks
export const fetchPersonalTasks = () => async (dispatch) => {
  dispatch({ type: PERSONAL_TASKS_REQUEST });
  try {
    const res = await axios.get(`${BASE_URL}/personalTask/getTasksList`, getAuthHeaders());
    dispatch({
      type: PERSONAL_TASKS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: PERSONAL_TASKS_FAILURE,
      payload: error.message,
    });
  }
};

// Get personal task by ID
export const fetchPersonalTaskById = (id) => async (dispatch) => {
  dispatch({ type: PERSONAL_TASK_DETAILS_REQUEST });
  try {
    const res = await axios.get(`${BASE_URL}/personalTask/getTaskById/${id}`, getAuthHeaders());
    dispatch({
      type: PERSONAL_TASK_DETAILS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: PERSONAL_TASK_DETAILS_FAILURE,
      payload: error.message,
    });
  }
};

// Update priority
export const updatePersonalTaskPriority = (id, priority) => async (dispatch) => {
  const res = await axios.patch(`${BASE_URL}/personalTask/updatePriority/${id}`, { priority }, getAuthHeaders(false));
  dispatch({
    type: UPDATE_PERSONAL_TASK_PRIORITY_SUCCESS,
    payload: { id, priority },
  });
  dispatch(fetchPersonalTasks());
  toast.success(res.data.message);
};

// Update status
export const updatePersonalTaskStatus = (id, status, completedDate) => async (dispatch) => {
  const res = await axios.patch(`${BASE_URL}/personalTask/updateStatus/${id}`, {
    status,
    completedDate,
  }, getAuthHeaders(false));
  dispatch({
    type: UPDATE_PERSONAL_TASK_STATUS_SUCCESS,
    payload: { id, status, completedDate },
  });
   toast.success(res.data.message);
  dispatch(fetchPersonalTasks());

};

// Delete task
export const deletePersonalTask = (id) => async (dispatch) => {
 const res = await axios.delete(`${BASE_URL}/personalTask/deleteTask/${id}`, getAuthHeaders());
  dispatch({
    type: DELETE_PERSONAL_TASK_SUCCESS,
    payload: id,
  });
   toast.success(res.data.message);
};
