import {
  FETCH_SERVICE_TYPES_REQUEST,
  FETCH_SERVICE_TYPES_SUCCESS,
  FETCH_SERVICE_TYPES_FAILURE,
  CREATE_SERVICE_TYPE_SUCCESS,
  UPDATE_SERVICE_TYPE_SUCCESS,
  DELETE_SERVICE_TYPE_SUCCESS,
  SERVICE_TYPE_ERROR,
  CLEAR_SERVICE_TYPE_SUCCESS_MESSAGE
} from "../actions/serviceTypeActions";

const initialState = {
  serviceTypes: [],
  loading: false,
  error: null,
  successMessage: null,
  totalPages: 1,
  currentPage: 1,
};

const serviceTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICE_TYPES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_SERVICE_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        serviceTypes: action.payload.serviceTypes,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    case FETCH_SERVICE_TYPES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATE_SERVICE_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        serviceTypes: [action.payload, ...state.serviceTypes],
        successMessage: "Service Type created successfully",
      };

    case UPDATE_SERVICE_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        serviceTypes: state.serviceTypes.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
        successMessage: "Service Type updated successfully",
      };

    case DELETE_SERVICE_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        serviceTypes: state.serviceTypes.filter((s) => s.id !== action.payload),
        successMessage: "Service Type deleted successfully",
      };

    case SERVICE_TYPE_ERROR:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_SERVICE_TYPE_SUCCESS_MESSAGE:
      return { ...state, successMessage: null };

    default:
      return state;
  }
};

export default serviceTypeReducer;
