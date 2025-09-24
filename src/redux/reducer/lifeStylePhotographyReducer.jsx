
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
} from "../actions/lifestylePhotographyAction";

const initialState = {
    loading: false,
    lifeStylePhotographyList: [],
    lifeStyletPhotography: null,
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
            return {
                ...state,
                loading: false,
                lifeStylePhotographyList: [...state.lifeStylePhotographyList, action.payload],
            };
        case LIST_LIFESTYLE_PHOTOGRAPHY_SUCCESS:
            return { ...state, loading: false, lifeStylePhotographyList: action.payload.lifeStyletPhotography || [] };

        case GET_LIFESTYLE_PHOTOGRAPHY_SUCCESS:
            return { ...state, loading: false, lifeStyletPhotography: action.payload };
        case DELETE_LIFESTYLE_PHOTOGRAPHY_SUCCESS:
            return {
                ...state,
                loading: false,
                lifeStylePhotographyList: state.lifeStylePhotographyList.filter((item) => item.id !== action.payload),
            };
        case CREATE_LIFESTYLE_PHOTOGRAPHY_FAIL:
        case LIST_LIFESTYLE_PHOTOGRAPHY_FAIL:
        case GET_LIFESTYLE_PHOTOGRAPHY_FAIL:
        case DELETE_LIFESTYLE_PHOTOGRAPHY_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
