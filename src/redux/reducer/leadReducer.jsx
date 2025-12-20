
import {
    FETCH_LEADS_REQUEST,
    FETCH_LEADS_SUCCESS,
    FETCH_LEADS_FAILURE,
    CREATE_LEAD_REQUEST,
    CREATE_LEAD_SUCCESS,
    CREATE_LEAD_FAILURE,
    UPDATE_LEAD_REQUEST,
    UPDATE_LEAD_SUCCESS,
    UPDATE_LEAD_FAILURE,
    DELETE_LEAD_REQUEST,
    DELETE_LEAD_SUCCESS,
    DELETE_LEAD_FAILURE,
    FETCH_LEAD_BY_ID_REQUEST,
    FETCH_LEAD_BY_ID_SUCCESS,
    FETCH_LEAD_BY_ID_FAILURE,
    CHECK_MOBILE_REQUEST,
    CHECK_MOBILE_SUCCESS,
    CHECK_MOBILE_FAILURE,
    FETCH_SALES_TEAM_LEADS_FAILURE,
    FETCH_SALES_TEAM_LEADS_REQUEST,
    FETCH_SALES_TEAM_LEADS_SUCCESS,
} from "../actions/leadAction";

const initialState = {
    leads: [],
    SalesTeamLeads:[],
    total: 0,
    currentPage: 1,
    totalPages: 1,
    selectedLead: null,
    mobileCheck: null,
    loading: false,
    error: null,
};

export const leadReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LEADS_REQUEST:
        case CREATE_LEAD_REQUEST:
        case UPDATE_LEAD_REQUEST:
        case DELETE_LEAD_REQUEST:
        case FETCH_LEAD_BY_ID_REQUEST:
        case CHECK_MOBILE_REQUEST:
        case FETCH_SALES_TEAM_LEADS_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_LEADS_SUCCESS:
            return {
                ...state,
                loading: false,
                leads: action.payload.Leads || [],
                total: action.payload.total,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages,
                limit: action.payload.limit,
            };

        case FETCH_SALES_TEAM_LEADS_SUCCESS:
            return {
                ...state,
                loading: false,
                SalesTeamLeads: action.payload.Leads || [],
                total: action.payload.total,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages,
                limit: action.payload.limit,
            };

        case FETCH_LEADS_FAILURE:
        case CREATE_LEAD_FAILURE:
        case UPDATE_LEAD_FAILURE:
        case DELETE_LEAD_FAILURE:
        case FETCH_LEAD_BY_ID_FAILURE:
        case CHECK_MOBILE_FAILURE:
        case FETCH_SALES_TEAM_LEADS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case CREATE_LEAD_SUCCESS:
            return {
                ...state,
                leads: [...state.leads, action.payload],
                loading: false,
            };
        case UPDATE_LEAD_SUCCESS:
            return { ...state, loading: false };

        case DELETE_LEAD_SUCCESS:
            return {
                ...state,
                loading: false,
                leads: state.leads.filter((lead) => lead.id !== action.payload),
            };

        case FETCH_LEAD_BY_ID_SUCCESS:
            return { ...state, loading: false, selectedLead: action.payload };

        case CHECK_MOBILE_SUCCESS:
            return { ...state, loading: false, mobileCheck: action.payload };

        default:
            return state;
    }
};
