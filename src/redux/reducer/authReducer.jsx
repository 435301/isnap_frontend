// redux/reducers/authReducer.js
// const initialState = {
//   loading: false,
//   user: null,
//   token: null,
//   error: null,
// };
const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("authToken") || null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...state, loading: false, user: null, token: null, error: null };
    default:
      return state;
  }
};
