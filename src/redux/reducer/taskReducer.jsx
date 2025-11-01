import {
    FETCH_MARKETPLACE_TASKS_REQUEST,
    FETCH_MARKETPLACE_TASKS_SUCCESS,
    FETCH_MARKETPLACE_TASKS_FAILURE,
    FETCH_EXECUTIVES_REQUEST,
    FETCH_EXECUTIVES_SUCCESS,
    FETCH_EXECUTIVES_FAILURE,
    UPDATE_PRIORITY_REQUEST,
    UPDATE_PRIORITY_SUCCESS,
    UPDATE_PRIORITY_FAILURE,
    ACCEPT_TASK_REQUEST,
    ACCEPT_TASK_SUCCESS,
    ACCEPT_TASK_FAILURE,
} from "../actions/taskAction";

const initialState = {
    loading: false,
    tasks: [],
    error: null,
    executives: [],
    updatedPriority: null,
    acceptedTask: null,
};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MARKETPLACE_TASKS_REQUEST:
        case FETCH_EXECUTIVES_REQUEST:
        case UPDATE_PRIORITY_REQUEST:
        case ACCEPT_TASK_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_MARKETPLACE_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: action.payload,
            };
        case FETCH_EXECUTIVES_SUCCESS:
            return { ...state, loading: false, executives: action.payload };

        case UPDATE_PRIORITY_SUCCESS:
            return { ...state, loading: false, updatedPriority: action.payload };

        case ACCEPT_TASK_SUCCESS:
            return { ...state, loading: false, acceptedTask: action.payload };
        case FETCH_MARKETPLACE_TASKS_FAILURE:
        case FETCH_EXECUTIVES_FAILURE:
        case UPDATE_PRIORITY_FAILURE:
        case ACCEPT_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
