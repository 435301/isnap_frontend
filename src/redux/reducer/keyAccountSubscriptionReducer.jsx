import {
    CREATE_SUBSCRIPTION_REQUEST,
    CREATE_SUBSCRIPTION_SUCCESS,
    CREATE_SUBSCRIPTION_FAILURE,
    DELETE_SUBSCRIPTION_REQUEST,
    DELETE_SUBSCRIPTION_SUCCESS,
    DELETE_SUBSCRIPTION_FAILURE,
    CREATE_KEYACCOUNT_COMMISSION_SUCCESS,
    CREATE_KEYACCOUNT_COMMISSION_REQUEST,
    CREATE_KEYACCOUNT_COMMISSION_FAILURE,
    FETCH_KEY_ACCOUNT_COMMISSION_REQUEST,
    FETCH_KEY_ACCOUNT_COMMISSION_SUCCESS,
    FETCH_KEY_ACCOUNT_COMMISSION_FAILURE,
    FETCH_KEYACCOUNT_SUBSCRIPTION_REQUEST,
    FETCH_KEYACCOUNT_SUBSCRIPTION_SUCCESS,
    FETCH_KEYACCOUNT_SUBSCRIPTION_FAILURE,
    FETCH_KEY_ACCOUNT_COMMISSIONS_REQUEST,
    FETCH_KEY_ACCOUNT_COMMISSIONS_SUCCESS,
    FETCH_KEY_ACCOUNT_COMMISSIONS_FAILURE,
} from "../actions/keyAccountSubscriptionAction";

const initialState = {
    subscriptions: [],
    loading: false,
    error: null,
    commissions: [],
    total: 0,
    security: null,
    serviceTypes: [],
};

const keyAccountSubscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SUBSCRIPTION_REQUEST:
        case DELETE_SUBSCRIPTION_REQUEST:
        case CREATE_KEYACCOUNT_COMMISSION_REQUEST:
        case FETCH_KEY_ACCOUNT_COMMISSION_REQUEST:
        case FETCH_KEYACCOUNT_SUBSCRIPTION_REQUEST:
        case FETCH_KEY_ACCOUNT_COMMISSIONS_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_SUBSCRIPTION_SUCCESS: {
            const existingIndex = state.subscriptions.findIndex(
                (l) => l.id === action.payload.id
            );
            let updatedSubscriptions = [...state.subscriptions];
            if (existingIndex >= 0) {
                updatedSubscriptions[existingIndex] = {
                    ...updatedSubscriptions[existingIndex],
                    ...action.payload,
                };
            } else {
                updatedSubscriptions = [action.payload, ...updatedSubscriptions];
            }
            return {
                ...state,
                subscriptions: updatedSubscriptions,
                total: updatedSubscriptions.length,
                loading: false,
                error: null,
            };
        }
        case DELETE_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                subscriptions: state.subscriptions.filter(
                    (sub) => sub.id !== action.payload
                ),
            };
        case CREATE_KEYACCOUNT_COMMISSION_SUCCESS:
            return {
                ...state,
                loading: false,
                commissions: action.payload.commissions,
                security: action.payload.security,
                total: action.payload.total,
            };
        case FETCH_KEY_ACCOUNT_COMMISSION_SUCCESS:
            return {
                ...state,
                loading: false,
                commissions: action.payload.commissions || [],
                security: action.payload.security || null,
                total: action.payload.total || 0,
                error: null,
            };
        case FETCH_KEYACCOUNT_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                subscriptions: action.payload.keyAccountSubscriptions || [],
                total: action.payload.total || 0,
                error: null,
            }
        case FETCH_KEY_ACCOUNT_COMMISSIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                serviceTypes: action.payload.serviceTypes,
                total: action.payload.total,
                error: null,
            };
        case CREATE_SUBSCRIPTION_FAILURE:
        case DELETE_SUBSCRIPTION_FAILURE:
        case CREATE_KEYACCOUNT_COMMISSION_FAILURE:
        case FETCH_KEY_ACCOUNT_COMMISSION_FAILURE:
        case FETCH_KEYACCOUNT_SUBSCRIPTION_FAILURE:
        case FETCH_KEY_ACCOUNT_COMMISSIONS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case "CLEAR_KEYACCOUNT_SUBSCRIPTIONS":
            return { ...state, subscriptions: [], commissions: [], total: 0, security: null ,serviceTypes:[]};

        default:
            return state;
    }
};

export default keyAccountSubscriptionReducer;
