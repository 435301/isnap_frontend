
import {
    LIST_ACONTENT_REQUEST,
    LIST_ACONTENT_SUCCESS,
    LIST_ACONTENT_FAIL,
    GET_ACONTENT_REQUEST,
    GET_ACONTENT_SUCCESS,
    GET_ACONTENT_FAIL,
    CREATE_ACONTENT_REQUEST,
    CREATE_ACONTENT_SUCCESS,
    CREATE_ACONTENT_FAIL,
    DELETE_ACONTENT_REQUEST,
    DELETE_ACONTENT_SUCCESS,
    DELETE_ACONTENT_FAIL
} from "../actions/A+PhotographyAction"

const initialState = {
    aContentPhotographyList: [],
    aContentPhotography: null,
    loading: false,
    error: null,
};

export const aContentPhotographyReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_ACONTENT_REQUEST:
        case GET_ACONTENT_REQUEST:
        case CREATE_ACONTENT_REQUEST:
        case DELETE_ACONTENT_REQUEST:
            return { ...state, loading: true };
        case LIST_ACONTENT_SUCCESS:
            return { ...state, loading: false, aContentPhotographyList: action.payload };
        case GET_ACONTENT_SUCCESS:
            return { ...state, loading: false, aContentPhotography: action.payload };
        case CREATE_ACONTENT_SUCCESS:
            // return {
            //     ...state,
            //     loading: false,
            //     aContentPhotographyList: [...state.aContentPhotographyList, action.payload],
            // };
            const updatedItem = action.payload;

            return {
                ...state,
                loading: false,
                aContentPhotographyList: state.aContentPhotographyList.some(item => item.id === updatedItem.id)
                    ? state.aContentPhotographyList.map(item =>
                        item.id === updatedItem.id ? updatedItem : item
                    )
                    : [...state.aContentPhotographyList, updatedItem],
            };
        case DELETE_ACONTENT_SUCCESS:
            return {
                ...state,
                loading: false,
                aContentPhotographyList: state.aContentPhotographyList.filter(
                    (item) => item.id !== action.payload
                ),
            };
        case LIST_ACONTENT_FAIL:
        case DELETE_ACONTENT_FAIL:
        case GET_ACONTENT_FAIL:
        case CREATE_ACONTENT_FAIL:
            return { ...state, loading: false, error: action.payload };
        case "CLEAR_ACONTENT_PHOTOGRAPHY_LIST":
            return { ...state, aContentPhotographyList: [] };
        default:
            return state;
    }
};
