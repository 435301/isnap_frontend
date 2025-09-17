import {
  FETCH_DEPARTMENTS_REQUEST,
  FETCH_DEPARTMENTS_SUCCESS,
  FETCH_DEPARTMENTS_FAILURE,
  CREATE_DEPARTMENT_SUCCESS,   // 👈 import it
  UPDATE_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_SUCCESS,
  DEPARTMENT_ERROR,
  CLEAR_DEPARTMENT_SUCCESS_MESSAGE,
} from "../actions/departmentActions";

const initialState = {
  departments: [],
  loading: false,
  error: null,
  successMessage: null,
  currentPage: 1,
  totalPages: 1,
};

export default function departmentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DEPARTMENTS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        departments: action.payload.departments,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    case FETCH_DEPARTMENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATE_DEPARTMENT_SUCCESS:   // 👈 handle create
      return {
        ...state,
        departments: [...state.departments, action.payload],
        successMessage: "Department created successfully",
      };

    case UPDATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: state.departments.map((d) =>
          d.id === action.payload.id ? { ...d, ...action.payload } : d
        ),
        successMessage: "Department updated successfully",
      };

    case DELETE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: state.departments.filter((d) => d.id !== action.payload),
        successMessage: "Department deleted successfully",
      };

    case DEPARTMENT_ERROR:
      return { ...state, error: action.payload };

    case CLEAR_DEPARTMENT_SUCCESS_MESSAGE:
      return { ...state, successMessage: null };

    default:
      return state;
  }
}
