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
} from "../actions/orderActions";

const initialState = {
    orders: [],
    pagination: {},
    loading: false,
    error: null,
    successMessage: null,
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS_REQUEST:
        case ADD_ORDER_REQUEST:
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                successMessage: null,
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
                successMessage: action.payload,
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
                successMessage: "Order deleted successfully",
            };

        case FETCH_ORDERS_FAILURE:
        case ADD_ORDER_FAILURE:
        case UPDATE_ORDER_FAILURE:
        case DELETE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default orderReducer;
