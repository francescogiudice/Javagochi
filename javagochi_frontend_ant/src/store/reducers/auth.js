import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    users: [],
    user: {},
    level: {},
    token: null,
    error: null,
    loading: false,
    fetchingUsers: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
    });
}

const getUserInfo = (state, action) => {
    return updateObject(state, {
        user: action.payload.user
    });
}

const getLevelInfo = (state, action) => {
    return updateObject(state, {
        level: action.payload.level
    });
}

const requestUsers = (state, action) => {
    return updateObject(state, {
        error: null,
        fetchingUsers: true
    });
}

const receiveUsers = (state, action) => {
    return updateObject(state, {
        error: null,
        fetchingUsers: false,
        users: action.payload.users
    });
}

const failUsers = (state, action) => {
    return updateObject(state, {
        error: action.error,
        fetchingUsers: false,
        users: []
    });
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.GET_USER_INFO_START:
            return authStart(state, action);
        case actionTypes.GET_USER_INFO_END:
            return getUserInfo(state, action);
        case actionTypes.GET_USER_LEVEL_INFO_END:
            return getLevelInfo(state, action);
        case actionTypes.REQUEST_USERS:
            return requestUsers(state, action);
        case actionTypes.RECEIVE_USERS:
            return receiveUsers(state, action);
        case actionTypes.FAIL_USERS:
            return failUsers(state, action);
        default:
            return state;

    }
}

export default userReducer;
