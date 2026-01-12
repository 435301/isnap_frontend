
import {
    ADMIN_SUPPORT_REQUEST, ADMIN_SUPPORT_FAILURE,
    ADMIN_SUPPORT_LIST_SUCCESS, ADMIN_SUPPORT_VIEW_SUCCESS, ADMIN_SUPPORT_CREATE_SUCCESS, ADMIN_SUPPORT_UPDATE_SUCCESS, ADMIN_SUPPORT_DELETE_SUCCESS} from
 "../actions/adminSupportAction";

const initialState = {
    loading: false,
    supports: [],
    selectedSupport: null,
    pagination: { },
    error: null,
};

const AdminSupportReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_SUPPORT_REQUEST:
            return { ...state, loading: true, error: null };

        case ADMIN_SUPPORT_LIST_SUCCESS:
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
        case ADMIN_SUPPORT_CREATE_SUCCESS:
        case ADMIN_SUPPORT_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case ADMIN_SUPPORT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default AdminSupportReducer;
