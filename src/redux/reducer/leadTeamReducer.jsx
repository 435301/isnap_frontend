import {
    LEAD_HISTORY_REQUEST,
    LEAD_HISTORY_SUCCESS,
    LEAD_HISTORY_FAIL,
    UPDATE_LEAD_HISTORY_REQUEST,
    UPDATE_LEAD_HISTORY_SUCCESS,
    UPDATE_LEAD_HISTORY_FAIL,
    RESET_UPDATE_LEAD_HISTORY,
} from "../actions/leadTeamAction";

const initialState = {
    loading: false,
    leadHistory: [],
    total: 0,
    currentPage: 1,
    totalPages: 1,
    error: null,
    limit: 0,
    updateLoading: false,
    updateSuccess: false,
    updateError: null,
};

export const leadHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        // ------- LIST -------
        case LEAD_HISTORY_REQUEST:
            return { ...state, loading: true, error: null };
        case LEAD_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                leadHistory: action.payload.Leads || [],
                total: action.payload.total,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages,
                limit: action.payload.limit,
            };
        case LEAD_HISTORY_FAIL:
            return {
                ...state, loading: false, error: action.payload, leadHistory: [],
                totalPages: 1
            };

        // ------- UPDATE -------
        case UPDATE_LEAD_HISTORY_REQUEST:
            return { ...state, updateLoading: true, updateSuccess: false, updateError: null };
        case UPDATE_LEAD_HISTORY_SUCCESS:
            return { ...state, updateLoading: false, updateSuccess: true };
        case UPDATE_LEAD_HISTORY_FAIL:
            return { ...state, updateLoading: false, updateError: action.payload };

        // ------- RESET -------
        case RESET_UPDATE_LEAD_HISTORY:
            return { ...state, updateSuccess: false, updateError: null };

        default:
            return state;
    }
};
