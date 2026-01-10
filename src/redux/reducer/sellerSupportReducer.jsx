
import {
    SELLER_SUPPORT_REQUEST, SELLER_SUPPORT_FAILURE,
    SELLER_SUPPORT_LIST_SUCCESS, SELLER_SUPPORT_VIEW_SUCCESS, SELLER_SUPPORT_CREATE_SUCCESS, SELLER_SUPPORT_UPDATE_SUCCESS, SELLER_SUPPORT_DELETE_SUCCESS} from
 "../actions/sellerSupportAction";

const initialState = {
    loading: false,
    supports: [],
    selectedSupport: null,
    pagination: { },
    error: null,
};

const sellerSupportReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELLER_SUPPORT_REQUEST:
            return { ...state, loading: true, error: null };

        case SELLER_SUPPORT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                supports: action.payload.supports || [],
                pagination: {
                    total: action.payload.total,
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    limit: action.payload.limit,
                },
            };

        case SELLER_SUPPORT_VIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedSupport: action.payload,
            };

        case SELLER_SUPPORT_CREATE_SUCCESS:
        case SELLER_SUPPORT_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case SELLER_SUPPORT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                supports: state.supports.filter(
                    (item) => item.id !== action.payload
                ),
            };

        case SELLER_SUPPORT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default sellerSupportReducer;
