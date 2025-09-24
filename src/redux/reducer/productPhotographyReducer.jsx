
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
} from "../actions/productPhotographyAction";

const initialState = {
    loading: false,
    productPhotographyList: [],
    productPhotography: null,
    error: null,
};

export const productPhotographyReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_PHOTOGRAPHY_REQUEST:
        case LIST_PRODUCT_PHOTOGRAPHY_REQUEST:
        case GET_PRODUCT_PHOTOGRAPHY_REQUEST:
        case DELETE_PRODUCT_PHOTOGRAPHY_REQUEST:
            return { ...state, loading: true };
        case CREATE_PRODUCT_PHOTOGRAPHY_SUCCESS:
            return {
                ...state,
                loading: false,
                productPhotographyList: [...state.productPhotographyList, action.payload],
            };
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
        case CREATE_PRODUCT_PHOTOGRAPHY_FAIL:
        case LIST_PRODUCT_PHOTOGRAPHY_FAIL:
        case GET_PRODUCT_PHOTOGRAPHY_FAIL:
        case DELETE_PRODUCT_PHOTOGRAPHY_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
