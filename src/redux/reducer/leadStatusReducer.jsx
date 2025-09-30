import {
    FETCH_LEAD_STATUS_REQUEST,
    FETCH_LEAD_STATUS_SUCCESS,
    FETCH_LEAD_STATUS_FAILURE,
    CREATE_LEAD_STATUS_REQUEST,
    CREATE_LEAD_STATUS_SUCCESS,
    CREATE_LEAD_STATUS_FAILURE,
    UPDATE_LEAD_STATUS_REQUEST,
    UPDATE_LEAD_STATUS_SUCCESS,
    UPDATE_LEAD_STATUS_FAILURE,
    DELETE_LEAD_STATUS_REQUEST,
    DELETE_LEAD_STATUS_SUCCESS,
    DELETE_LEAD_STATUS_FAILURE,
} from "../actions/leadStatusAction";

const initialState = {
    leadStatus: [],
    loading: false,
    error: null,
    totalPages: 1,
};

const leadStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LEAD_STATUS_REQUEST:
        case CREATE_LEAD_STATUS_REQUEST:
        case UPDATE_LEAD_STATUS_REQUEST:
        case DELETE_LEAD_STATUS_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_LEAD_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                leadStatus: action.payload.leadStatus,
                totalPages: action.payload.totalPages,
            };

        case CREATE_LEAD_STATUS_SUCCESS:
            return {
                leadStatus: [...state.leadStatus, action.payload],
            };

        case UPDATE_LEAD_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                leadStatus: state.leadStatus.map((s) =>
                    s.id === action.payload.id ? { ...s, ...action.payload } : s
                ),
            };

        case DELETE_LEAD_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                leadStatus: state.leadStatus.filter((s) => s.id !== action.payload),
            };

        case FETCH_LEAD_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                leadStatus: [],
                error: action.payload,
            };
        case CREATE_LEAD_STATUS_FAILURE:
        case UPDATE_LEAD_STATUS_FAILURE:
        case DELETE_LEAD_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default leadStatusReducer;
