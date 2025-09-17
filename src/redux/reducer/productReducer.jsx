import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    CREATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    PRODUCT_ERROR,
    CLEAR_PRODUCT_SUCCESS_MESSAGE,
} from "../actions/productActions";

const initialState = {
    products: [],
    loading: false,
    error: null,
    successMessage: null,
    currentPage: 1,
    totalPages: 1,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages,
                error: null,
            };

        case FETCH_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                successMessage: "Product created successfully",
                products: [...state.products, action.payload],
            };

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.map((prod) =>
                    prod.id === action.payload.id ? { ...prod, ...action.payload } : prod
                ),
                successMessage: "Product updated successfully",
            };

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                successMessage: "Product deleted successfully",
                products: state.products.filter((prod) => prod.id !== action.payload),
            };

        case PRODUCT_ERROR:
            return { ...state, error: action.payload };

        case CLEAR_PRODUCT_SUCCESS_MESSAGE:
            return { ...state, successMessage: null };

        default:
            return state;
    }
};

export default productReducer;
