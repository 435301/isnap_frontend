import {
    FETCH_CATALOG_LISTING_REQUEST,
    FETCH_CATALOG_LISTING_SUCCESS,
    FETCH_CATALOG_LISTING_FAILURE,
    CREATE_CATALOG_LISTING_SUCCESS,
    UPDATE_CATALOG_LISTING_SUCCESS,
    DELETE_CATALOG_LISTING_SUCCESS,
    CATALOG_LISTING_ERROR,
    CLEAR_CATALOG_LISTING_SUCCESS_MESSAGE,
    UPDATE_CATALOG_LISTING_FAILURE,
    FETCH_PER_SKU_PRICE_REQUEST,
    FETCH_PER_SKU_PRICE_SUCCESS,
    FETCH_PER_SKU_PRICE_FAILURE,
    FETCH_TOTAL_PRICE_REQUEST,
    FETCH_TOTAL_PRICE_SUCCESS,
    FETCH_TOTAL_PRICE_FAILURE
} from "../actions/catalogListingAction";

const initialState = {
    catalogListing: [],
    loading: false,
    error: null,
    total: 0,
    perSkuPriceData: null,
    totalPriceData: null,
};

export const catalogListingReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATALOG_LISTING_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_CATALOG_LISTING_SUCCESS:
            return {
                ...state,
                loading: false,
                catalogListing: action.payload.catalogListing || [],
                total: action.payload.total || 0,
                error: null,
            };
        case FETCH_CATALOG_LISTING_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case CREATE_CATALOG_LISTING_SUCCESS: {
            const existingIndex = state.catalogListing.findIndex(
                (l) => l.id === action.payload.id
            );
            let updatedCatalogListing = [...state.catalogListing];
            if (existingIndex >= 0) {
                updatedCatalogListing[existingIndex] = {
                    ...updatedCatalogListing[existingIndex],
                    ...action.payload,
                };
            } else {
                updatedCatalogListing = [action.payload, ...updatedCatalogListing];
            }
            return {
                ...state,
                catalogListing: updatedCatalogListing,
                total: updatedCatalogListing.length,
                loading: false,
                error: null,
            };
        }

        case UPDATE_CATALOG_LISTING_SUCCESS:
            return {
                ...state,
                catalogListing: state.catalogListing.map((l) => (l.id === action.payload.id ? action.payload : l)),
            };
        case UPDATE_CATALOG_LISTING_FAILURE:
            return { ...state, error: action.payload };
        case DELETE_CATALOG_LISTING_SUCCESS:
            return {
                ...state,
                catalogListing: state.catalogListing.filter((l) => l.id !== action.payload),
            };
        case FETCH_PER_SKU_PRICE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_PER_SKU_PRICE_SUCCESS:
            return {
                ...state,
                loading: false,
                perSkuPriceData: action.payload, // { perSkuPrice, matchedRange }
            };
        case FETCH_PER_SKU_PRICE_FAILURE:
            return { ...state, loading: false, error: action.payload };
             case FETCH_TOTAL_PRICE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_TOTAL_PRICE_SUCCESS:
            return {
                ...state,
                loading: false,
                totalPriceData: action.payload, 
            };
        case FETCH_TOTAL_PRICE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case CATALOG_LISTING_ERROR:
            return { ...state, error: action.payload };
        case CLEAR_CATALOG_LISTING_SUCCESS_MESSAGE:
            return { ...state, successMessage: null };
        default:
            return state;
    }
};
