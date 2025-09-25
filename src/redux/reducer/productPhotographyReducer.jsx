
import {
    CREATE_PRODUCT_PHOTOGRAPHY_REQUEST,
    CREATE_PRODUCT_PHOTOGRAPHY_SUCCESS,
    CREATE_PRODUCT_PHOTOGRAPHY_FAIL,
    LIST_PRODUCT_PHOTOGRAPHY_REQUEST,
    LIST_PRODUCT_PHOTOGRAPHY_SUCCESS,
    LIST_PRODUCT_PHOTOGRAPHY_FAIL,
    GET_PRODUCT_PHOTOGRAPHY_REQUEST,
    GET_PRODUCT_PHOTOGRAPHY_SUCCESS,
    GET_PRODUCT_PHOTOGRAPHY_FAIL,
    DELETE_PRODUCT_PHOTOGRAPHY_REQUEST,
    DELETE_PRODUCT_PHOTOGRAPHY_SUCCESS,
    DELETE_PRODUCT_PHOTOGRAPHY_FAIL,
    GET_TOTAL_PRICE_REQUEST,
    GET_TOTAL_PRICE_SUCCESS,
    GET_TOTAL_PRICE_FAIL,

} from "../actions/productPhotographyAction";

const initialState = {
    loading: false,
    productPhotographyList: [],
    productPhotography: null,
    totalPriceData: null,
    error: null,
};

export const productPhotographyReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_PHOTOGRAPHY_REQUEST:
        case LIST_PRODUCT_PHOTOGRAPHY_REQUEST:
        case GET_PRODUCT_PHOTOGRAPHY_REQUEST:
        case DELETE_PRODUCT_PHOTOGRAPHY_REQUEST:
        case GET_TOTAL_PRICE_REQUEST:
            return { ...state, loading: true };
        case CREATE_PRODUCT_PHOTOGRAPHY_SUCCESS: {
            const existingIndex = state.productPhotographyList.findIndex(
                (item) => item.id === action.payload.id
            );
            let updatedList = [...state.productPhotographyList];
            if (existingIndex >= 0) {
                // Update existing row
                updatedList[existingIndex] = {
                    ...updatedList[existingIndex],
                    ...action.payload,
                };
            } else {
                // Add new row at the beginning
                updatedList = [action.payload, ...updatedList];
            }
            return {
                ...state,
                loading: false,
                productPhotographyList: updatedList,
            };
        }
        case LIST_PRODUCT_PHOTOGRAPHY_SUCCESS:
            return { ...state, loading: false, productPhotographyList: action.payload.productPhotography || [] };

        case GET_PRODUCT_PHOTOGRAPHY_SUCCESS:
            return { ...state, loading: false, productPhotography: action.payload };
        case DELETE_PRODUCT_PHOTOGRAPHY_SUCCESS:
            return {
                ...state,
                loading: false,
                productPhotographyList: state.productPhotographyList.filter((item) => item.id !== action.payload),
            };
        case GET_TOTAL_PRICE_SUCCESS:
            return { ...state, loading: false, totalPriceData: action.payload };
        case CREATE_PRODUCT_PHOTOGRAPHY_FAIL:
        case LIST_PRODUCT_PHOTOGRAPHY_FAIL:
        case GET_PRODUCT_PHOTOGRAPHY_FAIL:
        case DELETE_PRODUCT_PHOTOGRAPHY_FAIL:
        case GET_TOTAL_PRICE_FAIL:
            return { ...state, loading: false, error: action.payload };
        case "CLEAR_PRODUCT_PHOTOGRPAHY_LISTING":
            return { ...state, productPhotographyList: [] };
        case "RESET_TOTAL_PRICE":
            return { ...state, totalPriceData: null };
        default:
            return state;
    }
};
