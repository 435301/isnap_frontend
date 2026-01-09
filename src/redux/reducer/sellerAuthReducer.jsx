import {
  BUSINESS_LOGIN_REQUEST,
  BUSINESS_LOGIN_SUCCESS,
  BUSINESS_LOGIN_FAILURE,
  BUSINESS_FORGOT_PASSWORD_REQUEST,
  BUSINESS_FORGOT_PASSWORD_SUCCESS,
  BUSINESS_FORGOT_PASSWORD_FAILURE,
  BUSINESS_VERIFY_OTP_REQUEST,
  BUSINESS_VERIFY_OTP_SUCCESS,
  BUSINESS_VERIFY_OTP_FAILURE,
  BUSINESS_RESET_PASSWORD_REQUEST,
  BUSINESS_RESET_PASSWORD_SUCCESS,
  BUSINESS_RESET_PASSWORD_FAILURE,
  BUSINESS_LOGOUT,
} from "../actions/sellerAuthAction";

const initialState = {
  loading: false,
  seller: JSON.parse(localStorage.getItem("seller")) || null,
  token: localStorage.getItem("authToken") || null,
  otp: null,
  message: "",
  error: null,
};

const sellerAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    // LOGIN
    case BUSINESS_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case BUSINESS_LOGIN_SUCCESS:
      return { ...state, loading: false, seller: action.payload.seller, token: action.payload.token };
    case BUSINESS_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // FORGOT PASSWORD
    case BUSINESS_FORGOT_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null };
    case BUSINESS_FORGOT_PASSWORD_SUCCESS:
      return { ...state, loading: false, message: action.payload.message, otp: action.payload.otp };
    case BUSINESS_FORGOT_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // VERIFY OTP
    case BUSINESS_VERIFY_OTP_REQUEST:
      return { ...state, loading: true, error: null };
    case BUSINESS_VERIFY_OTP_SUCCESS:
      return { ...state, loading: false, message: action.payload.message, otp: action.payload.otp };
    case BUSINESS_VERIFY_OTP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // RESET PASSWORD
    case BUSINESS_RESET_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null };
    case BUSINESS_RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, message: action.payload.message };
    case BUSINESS_RESET_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // LOGOUT
    case BUSINESS_LOGOUT:
      return { ...initialState, token: null, seller: null };

    default:
      return state;
  }
};

export default sellerAuthReducer;
