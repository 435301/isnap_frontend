// src/redux/reducers/mouStatusReducer.js
import {
  UPDATE_MOU_STATUS_REQUEST,
  UPDATE_MOU_STATUS_SUCCESS,
  UPDATE_MOU_STATUS_FAILURE,
  FETCH_MOU_REQUEST,
  FETCH_MOU_SUCCESS,
  FETCH_MOU_FAILURE,
} from "../actions/mouAction";

const initialState = {
  loading: false,
  mouStatus: null, // current status
    mouList: [],
    serviceTypes:[],
    commissionPricings:[],
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
      case FETCH_MOU_REQUEST:
      return { ...state, loading: true, error: null };
     case FETCH_MOU_SUCCESS:
      return {
        ...state,
        loading: false,
        mouList: action.payload.productListings || [],
        serviceTypes: action.payload.serviceTypes || [],
        commissionPricings: action.payload.commissionPricings || [],
        error: null,
      };
    case FETCH_MOU_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default mouStatusReducer;
