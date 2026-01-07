import {
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE,
    ADD_ORDER_REQUEST,
    ADD_ORDER_SUCCESS,
    ADD_ORDER_FAILURE,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
    FETCH_SUB_ORDERS_REQUEST,
    FETCH_SUB_ORDERS_FAILURE,
    FETCH_SUB_ORDERS_SUCCESS,
    PRODUCT_DATA_REQUEST,
    PRODUCT_DATA_FAILURE,
    PRODUCT_DATA_SUCCESS,
    ADD_SUB_ORDER_REQUEST,
    ADD_SUB_ORDER_SUCCESS,
    ADD_SUB_ORDER_FAILURE,
    EDIT_SUB_ORDER_REQUEST, EDIT_SUB_ORDER_FAILURE, EDIT_SUB_ORDER_SUCCESS,
    DELETE_SUB_ORDER_FAILURE,
    DELETE_SUB_ORDER_REQUEST,
    DELETE_SUB_ORDER_SUCCESS,
    FETCH_SUB_ORDERS_BY_ID_FAILURE, FETCH_SUB_ORDERS_BY_ID_REQUEST, FETCH_SUB_ORDERS_BY_ID_SUCCESS, RESET_PRODUCT_DATA
} from "../actions/orderActions";

const initialState = {
    orders: [],
    suborders: [],
    productData: null,
    pagination: {},
    loading: false,
    error: null,
    subOrderById: null,
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS_REQUEST:
        case ADD_ORDER_REQUEST:
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
        case FETCH_SUB_ORDERS_REQUEST:
        case PRODUCT_DATA_REQUEST:
        case ADD_SUB_ORDER_REQUEST:
        case EDIT_SUB_ORDER_REQUEST:
        case DELETE_SUB_ORDER_REQUEST:
        case FETCH_SUB_ORDERS_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ORDERS_SUCCESS:
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

        case ADD_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload,
            };

        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.filter(
                    (order) => order.id !== action.payload
                ),
            };
        case FETCH_SUB_ORDERS_SUCCESS:
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

        case PRODUCT_DATA_SUCCESS:
            return {
                ...state, loading: false, productData: action.payload.data
            }
        case ADD_SUB_ORDER_SUCCESS:
        case EDIT_SUB_ORDER_SUCCESS:
            return {
                ...state, loading: false
            }
        case DELETE_SUB_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                suborders: state.suborders.filter(
                    (suborder) => suborder.id !== action.payload
                ),
            };
        case FETCH_SUB_ORDERS_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                subOrderById: action.payload,
            };
        case FETCH_ORDERS_FAILURE:
        case ADD_ORDER_FAILURE:
        case UPDATE_ORDER_FAILURE:
        case DELETE_ORDER_FAILURE:
        case PRODUCT_DATA_FAILURE:
        case FETCH_SUB_ORDERS_FAILURE:
        case ADD_SUB_ORDER_FAILURE:
        case EDIT_SUB_ORDER_FAILURE:
        case DELETE_SUB_ORDER_FAILURE:
        case FETCH_SUB_ORDERS_BY_ID_FAILURE:

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

export default orderReducer;
