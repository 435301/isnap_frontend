import {
    FETCH_LEAD_SOURCES_REQUEST,
    FETCH_LEAD_SOURCES_SUCCESS,
    FETCH_LEAD_SOURCE_SUCCESS,
    FETCH_LEAD_SOURCES_FAILURE,
    CREATE_LEAD_SOURCE_REQUEST,
    CREATE_LEAD_SOURCE_SUCCESS,
    CREATE_LEAD_SOURCE_FAILURE,
    UPDATE_LEAD_SOURCE_REQUEST,
    UPDATE_LEAD_SOURCE_SUCCESS,
    UPDATE_LEAD_SOURCE_FAILURE,
    DELETE_LEAD_SOURCE_REQUEST,
    DELETE_LEAD_SOURCE_SUCCESS,
    DELETE_LEAD_SOURCE_FAILURE,
} from "../actions/leadSourceAction";

const initialState = {
    loading: false,
    leadSources: [],
    selectedLeadSource: null,
    totalPages: 1,
    currentPage: 1,
    total: 0,
    error: null,
};

const leadSourceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LEAD_SOURCES_REQUEST:
        case CREATE_LEAD_SOURCE_REQUEST:
        case UPDATE_LEAD_SOURCE_REQUEST:
        case DELETE_LEAD_SOURCE_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_LEAD_SOURCES_SUCCESS:
            return {
                ...state,
                loading: false,
                leadSources: action.payload.leadSources || [],
                totalPages: action.payload.totalPages || 1,
                currentPage: action.payload.currentPage || 1,
                total: action.payload.total || 0,
            };
        case FETCH_LEAD_SOURCE_SUCCESS:
            return { ...state, loading: false, selectedLeadSource: action.payload };
        case CREATE_LEAD_SOURCE_SUCCESS:
            return {
                leadSources: [...state.leadSources, action.payload],
            };
        case UPDATE_LEAD_SOURCE_SUCCESS:
        case DELETE_LEAD_SOURCE_SUCCESS:
            return {
                ...state,
                loading: false,
                leadSources: state.leadSources.filter((item) => item.id !== action.payload),
            };

        case FETCH_LEAD_SOURCES_FAILURE:
            return {
                ...state,
                loading: false,
                leadSources: [],
                error: action.payload,
            };
        case CREATE_LEAD_SOURCE_FAILURE:
        case UPDATE_LEAD_SOURCE_FAILURE:
        case DELETE_LEAD_SOURCE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default leadSourceReducer;
