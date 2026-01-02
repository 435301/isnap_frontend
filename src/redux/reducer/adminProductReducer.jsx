import {
  FETCH_SELLERS_REQUEST,
  FETCH_SELLERS_SUCCESS,
  FETCH_SELLERS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  BULK_UPLOAD_REQUEST,
  BULK_UPLOAD_SUCCESS,
  BULK_UPLOAD_FAILURE,
} from "../actions/adminProductsAction";

const initialState = {
  marketPlacesellers: [],
  products: [],
  pagination: {},
  bulkUploadResult: null,
  loading: false,
  error: null,
};

const adminProductReducer = (state = initialState, action) => {
  switch (action.type) {
    /* ===== SELLERS ===== */
    case FETCH_SELLERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_SELLERS_SUCCESS:
      return { ...state, loading: false, marketPlacesellers: action.payload };
    case FETCH_SELLERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    /* ===== PRODUCTS ===== */
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        pagination: {
          total: action.payload.total,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          limit: action.payload.limit,
        },
      };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    /* ===== ADD PRODUCT ===== */
    case ADD_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, loading: false };
    case ADD_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    /* ===== DELETE PRODUCT ===== */
    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.filter(
          (item) => item.id !== action.payload
        ),
      };
    case DELETE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    /* ===== BULK UPLOAD ===== */
    case BULK_UPLOAD_REQUEST:
      return { ...state, loading: true };
    case BULK_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        bulkUploadResult: action.payload,
      };
    case BULK_UPLOAD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default adminProductReducer;
