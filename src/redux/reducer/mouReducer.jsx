// src/redux/reducers/mouStatusReducer.js
import {
  UPDATE_MOU_STATUS_REQUEST,
  UPDATE_MOU_STATUS_SUCCESS,
  UPDATE_MOU_STATUS_FAILURE,
} from "../actions/mouAction";

const initialState = {
  loading: false,
  mouStatus: null, // current status
  error: null,
};

const mouStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MOU_STATUS_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_MOU_STATUS_SUCCESS:
      return { ...state, loading: false, mouStatus: action.payload.mouStatus };
    case UPDATE_MOU_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default mouStatusReducer;
