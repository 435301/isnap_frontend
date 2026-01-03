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
  FETCH_REPORTS_FAILURE,
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  BULK_STATUS_UPDATE_FAILURE,
  BULK_STATUS_UPDATE_SUCCESS,
  BULK_STATUS_UPDATE_REQUEST,
  BULK_DELETE_FAILURE,
  BULK_DELETE_REQUEST,
  BULK_DELETE_SUCCESS,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_FAILURE,
  EDIT_PRODUCT_SUCCESS,
} from "../actions/adminProductsAction";

const initialState = {
  marketPlacesellers: [],
  products: [],
  pagination: {},
  bulkUploadResult: null,
  loading: false,
  error: null,
  reports: [],
};

const adminProductReducer = (state = initialState, action) => {
  switch (action.type) {
    /* ===== SELLERS ===== */
    case FETCH_SELLERS_REQUEST:
    case FETCH_REPORTS_REQUEST:
    case BULK_DELETE_REQUEST:
    case BULK_STATUS_UPDATE_REQUEST:
    case EDIT_PRODUCT_REQUEST:
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
    case FETCH_REPORTS_SUCCESS:
      return {
        ...state,
        loading: false,
        reports: action.payload.reports,
        pagination: {
          total: action.payload.total,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          limit: action.payload.limit,
        }
      }
    case BULK_STATUS_UPDATE_SUCCESS:
      const updatedProducts = action.payload;
      return {
        ...state,
        loading: false,
        products: state.products.map((product) =>
          updatedProducts.find((p) => p.id === product.id)
            ? {
              ...product,
              status: updatedProducts.find((p) => p.id === product.id).status,
            }
            : product
        ),
      };
    case BULK_DELETE_SUCCESS: {
      const deletedIds = action.payload;
      return {
        ...state,
        loading: false,
        products: state.products.filter(
          (product) => !deletedIds.includes(product.id)
        ),
      };
    }
    case EDIT_PRODUCT_SUCCESS:
      return { ...state, loading: false };
    case BULK_UPLOAD_FAILURE:
    case FETCH_REPORTS_FAILURE:
    case BULK_STATUS_UPDATE_FAILURE:
    case BULK_DELETE_FAILURE:
    case EDIT_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default adminProductReducer;
