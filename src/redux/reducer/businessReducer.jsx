import {
  FETCH_BUSINESS_REQUEST,
  FETCH_BUSINESS_SUCCESS,
  FETCH_BUSINESS_FAILURE,
  UPDATE_BUSINESS_SUCCESS,
  DELETE_BUSINESS_SUCCESS,
  CREATE_BUSINESS_SUCCESS,
  BUSINESS_ERROR,
  CLEAR_BUSINESS_SUCCESS_MESSAGE,
  ADD_REQUIRED_DOCUMENTS_REQUEST,
  ADD_REQUIRED_DOCUMENTS_SUCCESS,
  ADD_REQUIRED_DOCUMENTS_FAILURE,
  FETCH_BUSINESS_REQUEST_EXECUTIVE,
  FETCH_BUSINESS_SUCCESS_EXECUTIVE,
  FETCH_BUSINESS_FAILURE_EXECUTIVE,
  APPROVE_MANAGER_REQUEST,
  APPROVE_MANAGER_SUCCESS,
  APPROVE_MANAGER_FAILURE,
  FETCH_BUSINESS_DOCUMENTS_REQUEST,
  FETCH_BUSINESS_DOCUMENTS_SUCCESS,
  FETCH_BUSINESS_DOCUMENTS_FAILURE,
  UPDATE_REQUIRED_DOCUMENTS_REQUEST,
  UPDATE_REQUIRED_DOCUMENTS_SUCCESS,
  UPDATE_REQUIRED_DOCUMENTS_FAILURE,
  DELETE_REQUIRED_DOCUMENTS_REQUEST,
  DELETE_REQUIRED_DOCUMENTS_SUCCESS,
  DELETE_REQUIRED_DOCUMENTS_FAILURE,
} from "../actions/businessActions";

const initialState = {
  businessDetails: [],
  businessDetailsSales: [],
  loading: false,
  error: null,
  successMessage: null,
  currentPage: 1,
  totalPages: 1,
  total: 0,
  limit: 10,
  addedDocuments: null,
  approveStatus: null,
  categories: [],
};

export default function businessReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BUSINESS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_BUSINESS_SUCCESS:
      return {
        ...state,
        loading: false,
        businessDetails: action.payload.businesses,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        total: action.payload.total,
        limit: action.payload.limit,
      };

    case FETCH_BUSINESS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATE_BUSINESS_SUCCESS:
      return {
        ...state,
        businessDetails: [action.payload.data, ...state.businessDetails],
        successMessage: action.payload.message,
      };

    case UPDATE_BUSINESS_SUCCESS:
      return {
        ...state,
        businessDetails: state.businessDetails.map((biz) =>
          biz.id === action.payload.id ? action.payload : biz
        ),
        successMessage: "Business updated successfully!",
      };

    case DELETE_BUSINESS_SUCCESS:
      return {
        ...state,
        businessDetails: state.businessDetails.filter((biz) => biz.id !== action.payload),
      };

    case BUSINESS_ERROR:
      return { ...state, error: action.payload, loading: false };

    case CLEAR_BUSINESS_SUCCESS_MESSAGE:
      return { ...state, successMessage: null };
    case ADD_REQUIRED_DOCUMENTS_REQUEST:
      return {
        ...state, loading: true, success: false, error: null,
      };

    case ADD_REQUIRED_DOCUMENTS_SUCCESS:
      return {
        ...state, loading: false, success: true, addedDocuments: action.payload.data.addedDocuments,
      };
    case ADD_REQUIRED_DOCUMENTS_FAILURE:
      return {
        ...state, loading: false, success: false, error: action.payload,
      };
    case FETCH_BUSINESS_DOCUMENTS_REQUEST:
    case UPDATE_REQUIRED_DOCUMENTS_REQUEST:
    case FETCH_BUSINESS_DOCUMENTS_SUCCESS:
      return { ...state, loading: false, categories: action.payload, };
    case UPDATE_REQUIRED_DOCUMENTS_SUCCESS:
    case FETCH_BUSINESS_DOCUMENTS_FAILURE:
    case UPDATE_REQUIRED_DOCUMENTS_FAILURE:
    case DELETE_REQUIRED_DOCUMENTS_REQUEST:
      return { ...state, loading: true, success: "", error: null };
    case DELETE_REQUIRED_DOCUMENTS_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case DELETE_REQUIRED_DOCUMENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_BUSINESS_REQUEST_EXECUTIVE:
      return { ...state, loading: true, error: null };

    case FETCH_BUSINESS_SUCCESS_EXECUTIVE:
      return {
        ...state,
        loading: false,
        businessDetailsSales: action.payload.businessDetails,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        total: action.payload.total,
        limit: action.payload.limit,
      };
    case FETCH_BUSINESS_FAILURE_EXECUTIVE:
      return { ...state, loading: false, error: action.payload };
    case APPROVE_MANAGER_REQUEST:
      return { ...state, loading: true, error: null };
    case APPROVE_MANAGER_SUCCESS:
      return {
        ...state,
        loading: false,
        approveStatus: action.payload.managerApproveStatus,
        error: null,
      };
    case APPROVE_MANAGER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
