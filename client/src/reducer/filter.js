import * as type from "../actions/ActionTypes";

const filterReducer = (state = {filter: "all", search: ""}, action) => {
    switch(action.type) {
        case type.SET_ALL:
            return {filter: "all", search: state.search};
        case type.SET_OPEN:
            return {filter: "open", search: state.search};
        case type.SET_IN_PROGRESS:
            return {filter: "in_progress", search: state.search};
        case type.SET_DONE:
            return {filter: "closed", search: state.search};
        case type.SET_SEARCH:
            return {filter: state.filter, search: action.text};
        default:
            return state;
    }
}

export default filterReducer;