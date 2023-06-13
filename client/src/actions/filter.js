import * as type from '../actions/ActionTypes';

export const setAll = () => {
    return {
        type: type.SET_ALL
    };
};

export const setOpen = () => {
    return {
        type: type.SET_OPEN
    };
};

export const setInProgress = () => {
    return {
        type: type.SET_IN_PROGRESS
    };
};

export const setDone = () => {
    return {
        type: type.SET_DONE
    };
};

export const setSearch = (text) => {
    return {
        type: type.SET_SEARCH,
        text
    };
};