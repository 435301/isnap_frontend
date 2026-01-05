import {
    FETCH_SELLER_PRODUCTS_REQUEST,
    FETCH_SELLER_PRODUCTS_SUCCESS,
    FETCH_SELLER_PRODUCTS_FAILURE,
    ADD_SELLER_PRODUCT_REQUEST,
    ADD_SELLER_PRODUCT_SUCCESS,
    ADD_SELLER_PRODUCT_FAILURE,
    DELETE_SELLER_PRODUCT_REQUEST,
    DELETE_SELLER_PRODUCT_SUCCESS,
    DELETE_SELLER_PRODUCT_FAILURE,
    BULK_SELLER_UPLOAD_REQUEST,
    BULK_SELLER_UPLOAD_SUCCESS,
    BULK_SELLER_UPLOAD_FAILURE,
    FETCH_SELLER_REPORTS_REQUEST,
    FETCH_SELLER_REPORTS_SUCCESS,
    FETCH_SELLER_REPORTS_FAILURE,
    BULK_SELLER_STATUS_UPDATE_REQUEST,
    BULK_SELLER_STATUS_UPDATE_SUCCESS,
    BULK_SELLER_STATUS_UPDATE_FAILURE,
    BULK_SELLER_DELETE_REQUEST,
    BULK_SELLER_DELETE_SUCCESS,
    BULK_SELLER_DELETE_FAILURE,
} from "../actions/sellerProductsAction";

const initialState = {
    sellerProducts: [],
    pagination: {},
    sellerBulkUploadResult: null,
    loading: false,
    error: null,
    sellerReports: [],
};

const sellerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        /* ===== SELLERS ===== */
        case BULK_SELLER_DELETE_REQUEST:
        case BULK_SELLER_STATUS_UPDATE_REQUEST:
        case FETCH_SELLER_REPORTS_REQUEST:
        case FETCH_SELLER_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case FETCH_SELLER_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                sellerProducts: action.payload.products,
                pagination: {
                    total: action.payload.total,
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    limit: action.payload.limit,
                },
            };
        case FETCH_SELLER_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        /* ===== ADD PRODUCT ===== */
        case ADD_SELLER_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case ADD_SELLER_PRODUCT_SUCCESS:
            return { ...state, loading: false };
        case ADD_SELLER_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        /* ===== DELETE PRODUCT ===== */
        case DELETE_SELLER_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case DELETE_SELLER_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.filter(
                    (item) => item.id !== action.payload
                ),
            };
            
        case DELETE_SELLER_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        /* ===== BULK UPLOAD ===== */
        case BULK_SELLER_UPLOAD_REQUEST:
            return { ...state, loading: true };
        case BULK_SELLER_UPLOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                sellerBulkUploadResult: action.payload,
            };
        case FETCH_SELLER_REPORTS_SUCCESS:
            return {
                ...state,
                loading: false,
                sellerReports: action.payload.reports,
                pagination: {
                    total: action.payload.total,
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    limit: action.payload.limit,
                }
            }
        case BULK_SELLER_STATUS_UPDATE_SUCCESS:
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
        case BULK_SELLER_DELETE_SUCCESS: {
            const deletedIds = action.payload;
            return {
                ...state,
                loading: false,
                products: state.products.filter(
                    (product) => !deletedIds.includes(product.id)
                ),
            };
        }
        case BULK_SELLER_UPLOAD_FAILURE:
        case FETCH_SELLER_REPORTS_FAILURE:
        case BULK_SELLER_STATUS_UPDATE_FAILURE:
        case BULK_SELLER_DELETE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default sellerProductReducer;
