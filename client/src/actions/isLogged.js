import * as type from "./ActionTypes";

export const sign_in = () => {
    return {
        type: type.SIGN_IN
    };
};

export const sign_out = () => {
    return {
        type: type.SIGN_OUT
    };
};