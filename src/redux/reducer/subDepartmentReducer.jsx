import {
  CREATE_SUBDEPARTMENT_REQUEST,
  CREATE_SUBDEPARTMENT_SUCCESS,
  CREATE_SUBDEPARTMENT_FAILURE,
  FETCH_SUBDEPARTMENTS_REQUEST,
  FETCH_SUBDEPARTMENTS_SUCCESS,
  FETCH_SUBDEPARTMENTS_FAILURE,
  FETCH_SUBDEPARTMENT_BY_ID_REQUEST,
  FETCH_SUBDEPARTMENT_BY_ID_SUCCESS,
  FETCH_SUBDEPARTMENT_BY_ID_FAILURE,
  UPDATE_SUBDEPARTMENT_REQUEST,
  UPDATE_SUBDEPARTMENT_SUCCESS,
  UPDATE_SUBDEPARTMENT_FAILURE,
  DELETE_SUBDEPARTMENT_REQUEST,
  DELETE_SUBDEPARTMENT_SUCCESS,
  DELETE_SUBDEPARTMENT_FAILURE,
} from "../actions/subDepartmentAction";

const initialState = {
  loading: false,
  subDepartments: [],
  subDepartment: null,
  pagination: {},
  success: false,
  error: null,
};

export const subDepartmentReducer = (state = initialState, action) => {
  switch (action.type) {
    // CREATE
    case CREATE_SUBDEPARTMENT_REQUEST:
    case FETCH_SUBDEPARTMENTS_REQUEST:
    case FETCH_SUBDEPARTMENT_BY_ID_REQUEST:
    case UPDATE_SUBDEPARTMENT_REQUEST:
    case DELETE_SUBDEPARTMENT_REQUEST:
      return { ...state, loading: true, success: false, error: null };

    // SUCCESS
    case CREATE_SUBDEPARTMENT_SUCCESS:
    case UPDATE_SUBDEPARTMENT_SUCCESS:
      return {
        ...state,
        subDepartments: state.subDepartments.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        ),
      };
    case DELETE_SUBDEPARTMENT_SUCCESS:
      return { ...state, loading: false,subDepartments: state.subDepartments.filter((item) => item.id !== action.payload), error: null };
     
    case FETCH_SUBDEPARTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        subDepartments: action.payload.subDepartments || [],
        pagination: {
          total: action.payload.total,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          limit: action.payload.limit,
        },
        success: true,
        error: null,
      };

    case FETCH_SUBDEPARTMENT_BY_ID_SUCCESS:
      return { ...state, loading: false, subDepartment: action.payload, success: true, error: null };

    //FAILURE
    case CREATE_SUBDEPARTMENT_FAILURE:
    case FETCH_SUBDEPARTMENTS_FAILURE:
    case FETCH_SUBDEPARTMENT_BY_ID_FAILURE:
    case UPDATE_SUBDEPARTMENT_FAILURE:
    case DELETE_SUBDEPARTMENT_FAILURE:
      return { ...state, loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};
