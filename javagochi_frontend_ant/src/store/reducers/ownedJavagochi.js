import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ownedJcs: [],
    selectedJc: {},
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

const getOwnedJcById = (state, action) => {
    console.log(action);
    return updateObject(state, {
        selectedJc: action.payload.selectedJc
    })
}

const useItemError = (state, action) => {
    console.log(action.error);
    return updateObject(state, {
        error: action.error
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
        case actionTypes.RECEIVED_OWNED_JC_BY_ID:
            return getOwnedJcById(state, action);
        case actionTypes.USE_ITEM_ERROR:
            return useItemError(state, action);
        default:
            return state;

    }
}

export default ownedJcReducer;
