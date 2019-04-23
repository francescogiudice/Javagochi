import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ownedJcs: [],
    error: null,
    fetchingJavagochis: false
}

const getOwnedJcsStart = (state, action) => {
    return updateObject(state, {
        error: null,
        fetchingJavagochis: true
    })
}

const getOwnedJcsSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        fetchingJavagochis: false,
        ownedJcs: action.payload.ownedJcs
    })
}

const getOwnedJcsError = (state, action) => {
    console.log(action.error);
    return updateObject(state, {
        error: action.error,
        fetchingJavagochis: false,
        ownedJcs: []
    })
}

const ownedJcReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_OWNED_JCS:
            return getOwnedJcsStart(state, action);
        case actionTypes.RECEIVED_OWNED_JCS:
            return getOwnedJcsSuccess(state, action);
        case actionTypes.JC_OWNED_FAILED:
            return getOwnedJcsError(state, action);
        default:
            return state;

    }
}

export default ownedJcReducer;
