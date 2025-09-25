
import {
    CREATE_MODEL_PHOTOGRAPHY_REQUEST,
    CREATE_MODEL_PHOTOGRAPHY_SUCCESS,
    CREATE_MODEL_PHOTOGRAPHY_FAIL,
    LIST_MODEL_PHOTOGRAPHY_REQUEST,
    LIST_MODEL_PHOTOGRAPHY_SUCCESS,
    LIST_MODEL_PHOTOGRAPHY_FAIL,
    GET_MODEL_PHOTOGRAPHY_REQUEST,
    GET_MODEL_PHOTOGRAPHY_SUCCESS,
    GET_MODEL_PHOTOGRAPHY_FAIL,
    DELETE_MODEL_PHOTOGRAPHY_REQUEST,
    DELETE_MODEL_PHOTOGRAPHY_SUCCESS,
    DELETE_MODEL_PHOTOGRAPHY_FAIL,
} from "../actions/modelPhotographyAction";

const initialState = {
    loading: false,
    modelPhotographyList: [],
    modelPhotography: null,
    error: null,
};

export const modelPhotographyReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_MODEL_PHOTOGRAPHY_REQUEST:
        case LIST_MODEL_PHOTOGRAPHY_REQUEST:
        case GET_MODEL_PHOTOGRAPHY_REQUEST:
        case DELETE_MODEL_PHOTOGRAPHY_REQUEST:
            return { ...state, loading: true };
        case CREATE_MODEL_PHOTOGRAPHY_SUCCESS:
            const exists = state.modelPhotographyList.find((item) => item.id === action.payload.id);
            return {
                ...state,
                loading: false,
                modelPhotographyList: exists
                    ? state.modelPhotographyList.map(item =>
                        item.id === action.payload.id ? action.payload : item
                    )
                    : [...state.modelPhotographyList, action.payload],
            };

        case LIST_MODEL_PHOTOGRAPHY_SUCCESS:
            return { ...state, loading: false, modelPhotographyList: action.payload.modelPhotography || [] };
        case GET_MODEL_PHOTOGRAPHY_SUCCESS:
            return { ...state, loading: false, modelPhotography: action.payload };

        case DELETE_MODEL_PHOTOGRAPHY_SUCCESS:
            return {
                ...state,
                loading: false,
                modelPhotographyList: state.modelPhotographyList.filter((item) => item.id !== action.payload),
            };
        case CREATE_MODEL_PHOTOGRAPHY_FAIL:
        case LIST_MODEL_PHOTOGRAPHY_FAIL:
        case GET_MODEL_PHOTOGRAPHY_FAIL:
        case DELETE_MODEL_PHOTOGRAPHY_FAIL:
            return { ...state, loading: false, error: action.payload };
            case "CLEAR_MODEL_PHOTOGRAPHY":
                return{...state, modelPhotographyList:[] }
        default:
            return state;
    }
};
