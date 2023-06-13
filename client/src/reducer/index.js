import loggedReducer from "./isLogged";
import taskReducer from "./tasks";
import filterReducer from "./filter"
import {combineReducers} from 'redux';

const rootReducer =  combineReducers({
    isLogged: loggedReducer,
    tasks: taskReducer,
    filter: filterReducer,
});

export default rootReducer
