import * as type from '../actions/ActionTypes';

export const getAllTasks = (all_tasks) => {
    return {
        type: type.GET_ALL_TASK,
        all_tasks
    };
};

export const editTask = (id, newTitle, newBody, newState) => {
    return {
        type: type.EDIT_TASK,
        id,
        newTitle,
        newBody,
        newState
    };
};