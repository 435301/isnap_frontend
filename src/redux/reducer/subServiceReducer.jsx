import {
FETCH_SUBSERVICES_REQUEST,
  FETCH_SUBSERVICES_SUCCESS,
  FETCH_SUBSERVICES_FAILURE,
  CREATE_SUBSERVICES_REQUEST,
  CREATE_SUBSERVICES_SUCCESS,
  CREATE_SUBSERVICES_FAILURE,
} from "../actions/subServiceActions";

const initialState = {
  subServices: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  createSuccess: null
};

export const subServiceReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_SUBSERVICES_REQUEST:
    case CREATE_SUBSERVICES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        createSuccess: null,
      };
    case FETCH_SUBSERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        subServices: action.payload.subServices,
        total: action.payload.total,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case CREATE_SUBSERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        createSuccess: action.payload.createdCount,
      };
    case FETCH_SUBSERVICES_FAILURE:
    case CREATE_SUBSERVICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
