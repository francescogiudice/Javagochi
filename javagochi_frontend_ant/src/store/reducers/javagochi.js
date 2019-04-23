import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    jcRaces: [],
    jcError: null,
    fetchingRaces: false
}

const getJcRacesStart = (state, action) => {
    return updateObject(state, {
        jcError: null,
        fetchingRaces: true
    })
}

const getJcRacesSuccess = (state, action) => {
    return updateObject(state, {
        jcError: null,
        fetchingRaces: false,
        jcRaces: action.payload.jcRaces
    })
}

const getJcRacesError = (state, action) => {
    return updateObject(state, {
        jcError: action.error,
        fetchingRaces: false,
        jcRaces: []
    })
}

const jcReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_JC_RACES:
            return getJcRacesStart(state, action);
        case actionTypes.RECEIVED_JC_RACES:
            return getJcRacesSuccess(state, action);
        case actionTypes.JC_RACES_FAILED:
            return getJcRacesError(state, action);
        default:
            return state;

    }
}

export default jcReducer;
