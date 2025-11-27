import {
    FETCH__MP_MANAGER_SELLER_LIST_REQUEST,
    FETCH_MP_MANAGER_SELLER_LIST_FAILURE,
    FETCH_MP_MANAGER_SELLER_LIST_SUCCESS,
    FETCH__MP_EXECUTIVES_SELLER_LIST_REQUEST,
    FETCH_MP_EXECUTIVES_SELLER_LIST_SUCCESS,
    FETCH_MP_EXECUTIVES_SELLER_LIST_FAILURE,
    FETCH_DIGITAL_MARKETING_SELLER_LIST_FAILURE,
    FETCH_DIGITAL_MARKETING_SELLER_LIST_REQUEST,
    FETCH_DIGITAL_MARKETING_SELLER_LIST_SUCCESS,
    FETCH_PHOTOGRAPHY_SELLER_LIST_REQUEST,
    FETCH_PHOTOGRAPHY_SELLER_LIST_SUCCESS,
    FETCH_PHOTOGRAPHY_SELLER_LIST_FAILURE,
    FETCH__SELLER_DETAILS_REQUEST,
    FETCH__SELLER_DETAILS_SUCCESS,
    FETCH__SELLER_DETAILST_FAILURE
} from "../actions/TeamSellerAction";



const initialState = {
    loading: false,
    MarketManagerSellerList: [],
    totalPages: 1,
    error: null,
    sellerData: {},
};

export const teamSellerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH__MP_MANAGER_SELLER_LIST_REQUEST:
        case FETCH__MP_EXECUTIVES_SELLER_LIST_REQUEST:
        case FETCH_DIGITAL_MARKETING_SELLER_LIST_REQUEST:
        case FETCH_PHOTOGRAPHY_SELLER_LIST_REQUEST:
        case FETCH__SELLER_DETAILS_REQUEST:
            return { ...state, loading: true, error: null, };
        case FETCH_MP_MANAGER_SELLER_LIST_SUCCESS:
        case FETCH_MP_EXECUTIVES_SELLER_LIST_SUCCESS:
        case FETCH_DIGITAL_MARKETING_SELLER_LIST_SUCCESS:
        case FETCH_PHOTOGRAPHY_SELLER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                MarketManagerSellerList: action.payload.businessDetails,
                totalPages: action.payload.totalPages,
            };
        case FETCH__SELLER_DETAILS_SUCCESS:
            return {
                ...state, loading: false, sellerData: action.payload,
            };
        case FETCH_MP_MANAGER_SELLER_LIST_FAILURE:
        case FETCH_MP_EXECUTIVES_SELLER_LIST_FAILURE:
        case FETCH_DIGITAL_MARKETING_SELLER_LIST_FAILURE:
        case FETCH_PHOTOGRAPHY_SELLER_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload, MarketManagerSellerList: [], };
        case FETCH__SELLER_DETAILST_FAILURE:
            return { ...state, loading: false, error: action.payload, sellerData: {} };
        default:
            return state;
    }
}