// src/redux/reducers/rolesReducer.js
const initialState = {
  roles: [],
  loading: false,
  error: null,
  successMessage: null,
};

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ROLES_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_ROLES_SUCCESS":
      return { ...state, loading: false, roles: action.payload, error: null };
    case "FETCH_ROLES_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "CREATE_ROLE_SUCCESS":
      return {
        ...state,
        roles: [...state.roles, action.payload],
      };
    case "UPDATE_ROLE_SUCCESS":
      return {
        ...state,
        roles: state.roles.map((role) =>
          role.id === action.payload.id ? action.payload : role
        ),
      };
    case "DELETE_ROLE_SUCCESS":
      return {
        ...state,
        roles: state.roles.filter((role) => role.id !== action.payload),
      };

    // ✅ success messages
    case "SET_SUCCESS_MESSAGE":
      return { ...state, successMessage: action.payload };
    case "CLEAR_SUCCESS_MESSAGE":
      return { ...state, successMessage: null };

    default:
      return state;
  }
};

export default rolesReducer;
