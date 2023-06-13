import * as type from "../actions/ActionTypes";

const loggedReducer = (state = false, action) => {
    switch(action.type) {
        case type.SIGN_IN:
            return true;
        case type.SIGN_OUT:
            localStorage.removeItem("accessToken");
            return false;
        default:
            return state;
    }
}

export default loggedReducer;