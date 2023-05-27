import { combineReducers } from 'redux';
import {
    FETCH_USERS_SUCCESS,
    DELETE_USER_SUCCESS,
    EDIT_USER_SUCCESS, CREATE_USER_SUCCESS,
} from './actions';

const usersReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESS:
            return action.payload;
        case DELETE_USER_SUCCESS:
            return state.filter((user) => user._id !== action.payload);
        case EDIT_USER_SUCCESS:
            const updatedUser = action.payload.data;
            const indexUpdUser = state.findIndex(user => user._id === updatedUser._id);
            state[indexUpdUser] = updatedUser;
            return [...state];
        case CREATE_USER_SUCCESS:
            const newUser = action.payload.data;
            return [...state, newUser];
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    users: usersReducer,
});

export default rootReducer;
