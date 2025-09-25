// storePhotographyReducer.js
import {
    CREATE_STORE_PHOTOGRAPHY_REQUEST,
    CREATE_STORE_PHOTOGRAPHY_SUCCESS,
    CREATE_STORE_PHOTOGRAPHY_FAILURE,
    LIST_STORE_PHOTOGRAPHY_REQUEST,
    LIST_STORE_PHOTOGRAPHY_SUCCESS,
    LIST_STORE_PHOTOGRAPHY_FAILURE,
    GET_STORE_PHOTOGRAPHY_REQUEST,
    GET_STORE_PHOTOGRAPHY_SUCCESS,
    GET_STORE_PHOTOGRAPHY_FAILURE,
    DELETE_STORE_PHOTOGRAPHY_REQUEST,
    DELETE_STORE_PHOTOGRAPHY_SUCCESS,
    DELETE_STORE_PHOTOGRAPHY_FAILURE,
    CLEAR_STORE_PHOTOGRAPHY,
} from "../actions/storePhotographyAction";

const initialState = {
    loading: false,
    storePhotographyList: [],
    storePhotography: {},
    error: null,
};

export const storePhotographyReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_STORE_PHOTOGRAPHY_REQUEST:
        case LIST_STORE_PHOTOGRAPHY_REQUEST:
        case GET_STORE_PHOTOGRAPHY_REQUEST:
        case DELETE_STORE_PHOTOGRAPHY_REQUEST:
            return { ...state, loading: true };
        case CREATE_STORE_PHOTOGRAPHY_SUCCESS:
            const updatedItem = action.payload;
            return {
                ...state,
                loading: false,
                storePhotographyList: state.storePhotographyList.some(item => item.id === updatedItem.id)
                    ? state.storePhotographyList.map(item =>
                        item.id === updatedItem.id ? updatedItem : item
                    )
                    : [...state.storePhotographyList, updatedItem],
            };
        case LIST_STORE_PHOTOGRAPHY_SUCCESS:
            return { ...state, loading: false, storePhotographyList: action.payload };
        case GET_STORE_PHOTOGRAPHY_SUCCESS:
            return { ...state, loading: false, storePhotography: action.payload };
        case DELETE_STORE_PHOTOGRAPHY_SUCCESS:
            return {
                ...state,
                loading: false,
                storePhotographyList: state.storePhotographyList.filter(
                    (item) => item.id !== action.payload
                ),
            };
        case CREATE_STORE_PHOTOGRAPHY_FAILURE:
        case LIST_STORE_PHOTOGRAPHY_FAILURE:
        case DELETE_STORE_PHOTOGRAPHY_FAILURE:
        case GET_STORE_PHOTOGRAPHY_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_STORE_PHOTOGRAPHY:
            return initialState;

        default:
            return state;
    }
};
