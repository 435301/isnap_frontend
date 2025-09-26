
import {
    FETCH_LIFESTYLE_ACTIVITIES_REQUEST,
    FETCH_LIFESTYLE_ACTIVITIES_SUCCESS,
    FETCH_LIFESTYLE_ACTIVITIES_FAILURE,
    FETCH_MODEL_ACTIVITIES_REQUEST,
    FETCH_MODEL_ACTIVITIES_SUCCESS,
    FETCH_MODEL_ACTIVITIES_FAILURE,
} from "../actions/photographyFilterAction";

const initialState = {
    lifestyleActivities: [],
    modelActivities: [],
    loading: false,
    error: null,
};

export const lifestyleActivitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LIFESTYLE_ACTIVITIES_REQUEST:
            return { ...state, loading: true };
        case FETCH_LIFESTYLE_ACTIVITIES_SUCCESS:
            return { ...state, loading: false, lifestyleActivities: action.payload };
        case FETCH_LIFESTYLE_ACTIVITIES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case FETCH_MODEL_ACTIVITIES_REQUEST:
            return { ...state, loading: true };
        case FETCH_MODEL_ACTIVITIES_SUCCESS:
            return { ...state, loading: false, modelActivities: action.payload };
        case FETCH_MODEL_ACTIVITIES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
