import {
    FETCH_SELLER_ORDERS_REQUEST,
    FETCH_SELLER_ORDERS_SUCCESS,
    FETCH_SELLER_ORDERS_FAILURE,

    ADD_SELLER_ORDER_REQUEST,
    ADD_SELLER_ORDER_SUCCESS,
    ADD_SELLER_ORDER_FAILURE,

    FETCH_SELLER_SUB_ORDERS_REQUEST,
    FETCH_SELLER_SUB_ORDERS_SUCCESS,
    FETCH_SELLER_SUB_ORDERS_FAILURE,

    FETCH_SELLER_SUB_ORDERS_BY_ID_REQUEST,
    FETCH_SELLER_SUB_ORDERS_BY_ID_SUCCESS,
    FETCH_SELLER_SUB_ORDERS_BY_ID_FAILURE,

    ADD_SELLER_SUB_ORDER_REQUEST,
    ADD_SELLER_SUB_ORDER_SUCCESS,
    ADD_SELLER_SUB_ORDER_FAILURE,

    EDIT_SELLER_SUB_ORDER_REQUEST,
    EDIT_SELLER_SUB_ORDER_SUCCESS,
    EDIT_SELLER_SUB_ORDER_FAILURE,

    DELETE_SELLER_SUB_ORDER_REQUEST,
    DELETE_SELLER_SUB_ORDER_SUCCESS,
    DELETE_SELLER_SUB_ORDER_FAILURE,

    PRODUCT_SELLER_DATA_REQUEST,
    PRODUCT_SELLER_DATA_FAILURE,
    PRODUCT_SELLER_DATA_SUCCESS,

    RESET_PRODUCT_DATA,
} from "../actions/sellerOrderAction";

const initialState = {
    orders: [],
    suborders: [],
    subOrderById: null,
    productData: null,
    pagination: {},
    loading: false,
    error: null,
};

const sellerOrderReducer = (state = initialState, action) => {
    switch (action.type) {

        /* ================= REQUEST ================= */
        case FETCH_SELLER_ORDERS_REQUEST:
        case FETCH_SELLER_SUB_ORDERS_REQUEST:
        case FETCH_SELLER_SUB_ORDERS_BY_ID_REQUEST:
        case ADD_SELLER_ORDER_REQUEST:
        case ADD_SELLER_SUB_ORDER_REQUEST:
        case EDIT_SELLER_SUB_ORDER_REQUEST:
        case DELETE_SELLER_SUB_ORDER_REQUEST:
        case PRODUCT_SELLER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        /* ================= SUCCESS ================= */
        case FETCH_SELLER_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload.orders,
                pagination: {
                    total: action.payload.total,
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    limit: action.payload.limit,
                },
            };

        case FETCH_SELLER_SUB_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                suborders: action.payload.suborders,
                pagination: {
                    total: action.payload.total,
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    limit: action.payload.limit,
                },
            };

        case FETCH_SELLER_SUB_ORDERS_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                subOrderById: action.payload,
            };

        case ADD_SELLER_SUB_ORDER_SUCCESS:
        case ADD_SELLER_ORDER_SUCCESS:
        case EDIT_SELLER_SUB_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case DELETE_SELLER_SUB_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                suborders: state.suborders.filter(
                    (item) => item.id !== action.payload
                ),
            };
        case PRODUCT_SELLER_DATA_SUCCESS:
            return { ...state, loading: false, productData: action.payload }
        /* ================= FAILURE ================= */
        case FETCH_SELLER_ORDERS_FAILURE:
        case FETCH_SELLER_SUB_ORDERS_FAILURE:
        case FETCH_SELLER_SUB_ORDERS_BY_ID_FAILURE:
        case ADD_SELLER_ORDER_FAILURE:
        case ADD_SELLER_SUB_ORDER_FAILURE:
        case EDIT_SELLER_SUB_ORDER_FAILURE:
        case DELETE_SELLER_SUB_ORDER_FAILURE:
        case PRODUCT_SELLER_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case RESET_PRODUCT_DATA:
            return {
                ...state,
                productData: {},
            };
        default:
            return state;
    }
};

export default sellerOrderReducer;
