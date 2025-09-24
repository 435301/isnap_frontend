import {
    CREATE_DIGITAL_MARKETING_REQUEST,
    CREATE_DIGITAL_MARKETING_SUCCESS,
    CREATE_DIGITAL_MARKETING_FAILURE,
    FETCH_DIGITAL_MARKETING_REQUEST,
    FETCH_DIGITAL_MARKETING_SUCCESS,
    FETCH_DIGITAL_MARKETING_FAILURE,
} from "../actions/digitalMarketingAction";

const initialState = {
    loading: false,
    digitalMarketing: null,
    error: null,
};

export const digitalMarketingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_DIGITAL_MARKETING_REQUEST:
        case FETCH_DIGITAL_MARKETING_REQUEST:
            return { ...state, loading: true, error: null, };
        case CREATE_DIGITAL_MARKETING_SUCCESS:
            return {
                ...state,
                loading: false,
                digitalMarketing: action.payload,
            };
        case FETCH_DIGITAL_MARKETING_SUCCESS:
            return { ...state, loading: false, digitalMarketing: action.payload };
        case CREATE_DIGITAL_MARKETING_FAILURE:
        case FETCH_DIGITAL_MARKETING_FAILURE:
            return {
                ...state, loading: false, error: action.payload,
            };
        case "RESET_DIGITAL_MARKETING":
            return { ...state, digitalMarketing: {} };
        default:
            return state;
    }
};
