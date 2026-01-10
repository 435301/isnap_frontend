import {
    CREATE_SUPPORT_STATUS_REQUEST,
    CREATE_SUPPORT_STATUS_SUCCESS,
    CREATE_SUPPORT_STATUS_FAILURE,
    FETCH_SUPPORT_STATUSS_REQUEST,
    FETCH_SUPPORT_STATUSS_SUCCESS,
    FETCH_SUPPORT_STATUSS_FAILURE,
    FETCH_SUPPORT_STATUS_BY_ID_REQUEST,
    FETCH_SUPPORT_STATUS_BY_ID_SUCCESS,
    FETCH_SUPPORT_STATUS_BY_ID_FAILURE,
    UPDATE_SUPPORT_STATUS_REQUEST,
    UPDATE_SUPPORT_STATUS_SUCCESS,
    UPDATE_SUPPORT_STATUS_FAILURE,
    DELETE_SUPPORT_STATUS_REQUEST,
    DELETE_SUPPORT_STATUS_SUCCESS,
    DELETE_SUPPORT_STATUS_FAILURE,
} from "../actions/supportStatusAction";

const initialState = {
    loading: false,
    supportStatusList: [],
    supportStatus: null,
    pagination: {},
    error: null,
};

export const supportStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SUPPORT_STATUS_REQUEST:
        case FETCH_SUPPORT_STATUSS_REQUEST:
        case FETCH_SUPPORT_STATUS_BY_ID_REQUEST:
        case UPDATE_SUPPORT_STATUS_REQUEST:
        case DELETE_SUPPORT_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case CREATE_SUPPORT_STATUS_SUCCESS:
           return { ...state, loading: false}

        case FETCH_SUPPORT_STATUSS_SUCCESS:
            return {
                ...state,
                loading: false,
                supportStatusList: action.payload.supportStatus || [],
                pagination: {
                    total: action.payload.total,
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    limit: action.payload.limit,
                },
            };

        case FETCH_SUPPORT_STATUS_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                supportStatus: action.payload,
            };

        case UPDATE_SUPPORT_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };

        case DELETE_SUPPORT_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                supportStatusList: state.supportStatusList.filter((doc) => doc.id !== action.payload),
            };

        case CREATE_SUPPORT_STATUS_FAILURE:
        case FETCH_SUPPORT_STATUSS_FAILURE:
        case FETCH_SUPPORT_STATUS_BY_ID_FAILURE:
        case UPDATE_SUPPORT_STATUS_FAILURE:
        case DELETE_SUPPORT_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
