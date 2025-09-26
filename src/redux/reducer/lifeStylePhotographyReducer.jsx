
import {
    CREATE_LIFESTYLE_PHOTOGRAPHY_REQUEST,
    CREATE_LIFESTYLE_PHOTOGRAPHY_SUCCESS,
    CREATE_LIFESTYLE_PHOTOGRAPHY_FAIL,
    LIST_LIFESTYLE_PHOTOGRAPHY_REQUEST,
    LIST_LIFESTYLE_PHOTOGRAPHY_SUCCESS,
    LIST_LIFESTYLE_PHOTOGRAPHY_FAIL,
    GET_LIFESTYLE_PHOTOGRAPHY_REQUEST,
    GET_LIFESTYLE_PHOTOGRAPHY_SUCCESS,
    GET_LIFESTYLE_PHOTOGRAPHY_FAIL,
    DELETE_LIFESTYLE_PHOTOGRAPHY_REQUEST,
    DELETE_LIFESTYLE_PHOTOGRAPHY_SUCCESS,
    DELETE_LIFESTYLE_PHOTOGRAPHY_FAIL,
    RESET_LIFESTYLE_PHOTOGRAPHY
} from "../actions/lifestylePhotographyAction";

const initialState = {
    loading: false,
    lifestylePhotographyList: [],
    liefstylePhotography: null,
    error: null,
};

export const lifeStylePhotographyReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_LIFESTYLE_PHOTOGRAPHY_REQUEST:
        case LIST_LIFESTYLE_PHOTOGRAPHY_REQUEST:
        case GET_LIFESTYLE_PHOTOGRAPHY_REQUEST:
        case DELETE_LIFESTYLE_PHOTOGRAPHY_REQUEST:
            return { ...state, loading: true };
        case CREATE_LIFESTYLE_PHOTOGRAPHY_SUCCESS:
            const updatedItem = action.payload;
            return {
                ...state,
                loading: false,
                lifestylePhotographyList: state.lifestylePhotographyList.some(item => item.id === updatedItem.id)
                    ? state.lifestylePhotographyList.map(item =>
                        item.id === updatedItem.id ? updatedItem : item
                    )
                    : [...state.lifestylePhotographyList, updatedItem],
            };
        case LIST_LIFESTYLE_PHOTOGRAPHY_SUCCESS:
            return { ...state, loading: false, lifestylePhotographyList: action.payload.lifeStylePhotography || [] };

        case GET_LIFESTYLE_PHOTOGRAPHY_SUCCESS:
            return { ...state, loading: false, liefstylePhotography: action.payload };
        case DELETE_LIFESTYLE_PHOTOGRAPHY_SUCCESS:
            return {
                ...state,
                loading: false,
                lifestylePhotographyList: state.lifestylePhotographyList.filter((item) => item.id !== action.payload),
            };
        case CREATE_LIFESTYLE_PHOTOGRAPHY_FAIL:
        case LIST_LIFESTYLE_PHOTOGRAPHY_FAIL:
        case GET_LIFESTYLE_PHOTOGRAPHY_FAIL:
        case DELETE_LIFESTYLE_PHOTOGRAPHY_FAIL:
            return { ...state, loading: false, error: action.payload };
        case RESET_LIFESTYLE_PHOTOGRAPHY:
            return { ...state, liefstylePhotography: null, lifestylePhotographyList: [] }
        default:
            return state;
    }
};
