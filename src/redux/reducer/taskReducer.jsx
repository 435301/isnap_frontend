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
    REJECT_TASK_REQUEST,
    REJECT_TASK_SUCCESS,
    REJECT_TASK_FAILURE,
    MOVE_TASK_REQUEST,
    MOVE_TASK_SUCCESS,
    MOVE_TASK_FAILURE,
    ASSIGN_TASK_REQUEST,
    ASSIGN_TASK_SUCCESS,
    ASSIGN_TASK_FAILURE,
    FETCH_MY_TASKS_REQUEST,
    FETCH_MY_TASKS_SUCCESS,
    FETCH_MY_TASKS_FAILURE,
    FETCH_DM_TASKS_REQUEST,
    FETCH_DM_TASKS_SUCCESS,
    FETCH_DM_TASKS_FAILURE,
    FETCH_DM_MY_TASKS_REQUEST,
    FETCH_DM_MY_TASKS_SUCCESS,
    FETCH_DM_MY_TASKS_FAILURE,
    FETCH_PHOTOGRAPHY_TASKS_REQUEST,
    FETCH_PHOTOGRAPHY_TASKS_SUCCESS,
    FETCH_PHOTOGRAPHY_TASKS_FAILURE,
    FETCH_PHOTOGRAPHY_MY_TASKS_REQUEST,
    FETCH_PHOTOGRAPHY_MY_TASKS_SUCCESS,
    FETCH_PHOTOGRAPHY_MY_TASKS_FAILURE,
} from "../actions/taskAction";

const initialState = {
    loading: false,
    tasks: [],
    error: null,
    executives: [],
    updatedPriority: null,
    acceptedTask: null,
    movedTask: null,
    assignedTask: null,
    myTasks: [],
    dmTasks: [],
    dmMyTasks: [],
    PhotographyTasks: [],
    PhotographyMyTasks: [],
};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MARKETPLACE_TASKS_REQUEST:
        case FETCH_EXECUTIVES_REQUEST:
        case UPDATE_PRIORITY_REQUEST:
        case ACCEPT_TASK_REQUEST:
        case REJECT_TASK_REQUEST:
        case MOVE_TASK_REQUEST:
        case ASSIGN_TASK_REQUEST:
        case FETCH_MY_TASKS_REQUEST:
        case FETCH_DM_TASKS_REQUEST:
        case FETCH_DM_MY_TASKS_REQUEST:
        case FETCH_PHOTOGRAPHY_TASKS_REQUEST:
        case FETCH_PHOTOGRAPHY_MY_TASKS_REQUEST:
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
            return {
                ...state,
                loading: false,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.taskId
                        ? { ...task, priorityId: action.payload.priorityId, priorityLabel: action.payload.priorityLabel }
                        : task
                ),
                updatedPriority: action.payload,
            };


        case ACCEPT_TASK_SUCCESS:
            return { ...state, loading: false, acceptedTask: action.payload };
        case REJECT_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                rejectedTask: action.payload,

            };
        case MOVE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                movedTask: action.payload,
                tasks: state.tasks.map((t) =>
                    t.taskId === action.payload.taskId
                        ? { ...t, workProgressStatus: action.payload.workProgressStatus }
                        : t
                ),
            };
        case ASSIGN_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                assignedTask: action.payload,
                tasks: state.tasks.map((t) =>
                    t.taskId === action.payload.taskId
                        ? {
                            ...t,
                            executiveId: action.payload.executiveId,
                            assignedAt: action.payload.assignedAt,
                        }
                        : t
                ),
            };
        case FETCH_MY_TASKS_SUCCESS:
            return { ...state, loading: false, myTasks: action.payload };
        case FETCH_DM_TASKS_SUCCESS:
            return { ...state, loading: false, dmTasks: action.payload };
        case FETCH_DM_MY_TASKS_SUCCESS:
            return { ...state, loading: false, dmMyTasks: action.payload };
        case FETCH_PHOTOGRAPHY_TASKS_SUCCESS:
            return { ...state, loading: false, PhotographyTasks: action.payload, error: null };
        case FETCH_PHOTOGRAPHY_MY_TASKS_SUCCESS:
            return { ...state, loading: false, PhotographyMyTasks: action.payload, error: null };
        case FETCH_MARKETPLACE_TASKS_FAILURE:
        case FETCH_EXECUTIVES_FAILURE:
        case UPDATE_PRIORITY_FAILURE:
        case ACCEPT_TASK_FAILURE:
        case REJECT_TASK_FAILURE:
        case MOVE_TASK_FAILURE:
        case ASSIGN_TASK_FAILURE:
        case FETCH_MY_TASKS_FAILURE:
        case FETCH_DM_TASKS_FAILURE:
        case FETCH_DM_MY_TASKS_FAILURE:
        case FETCH_PHOTOGRAPHY_TASKS_FAILURE:
        case FETCH_PHOTOGRAPHY_MY_TASKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
