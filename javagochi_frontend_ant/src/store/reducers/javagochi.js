import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    jcRaces: [],
    selectedRace: {},
    jcError: null,
    fetchingRaces: false,
    fetchingRace: false,
    performingBuy: false,
    message: ''
}

const getJcRacesStart = (state, action) => {
    return updateObject(state, {
        jcError: null,
        fetchingRaces: true
    })
}

const getJcRaceStart = (state, action) => {
    return updateObject(state, {
        jcError: null,
        fetchingRace: true
    })
}

const getJcRacesSuccess = (state, action) => {
    return updateObject(state, {
        jcError: null,
        fetchingRaces: false,
        jcRaces: action.payload.jcRaces
    })
}

const getJcRaceSuccess = (state, action) => {
    return updateObject(state, {
        jcError: null,
        fetchingRace: false,
        selectedRace: action.payload.selectedRace
    });
}

const getJcRacesError = (state, action) => {
    return updateObject(state, {
        jcError: action.error,
        fetchingRaces: false,
        jcRaces: []
    })
}

const getJcRaceError = (state, action) => {
    return updateObject(state, {
        jcError: action.error,
        fetchingRace: false,
        selectedRace: {}
    });
}

const startBuy = (state, action) => {
    return updateObject(state, {
        performingBuy: true
    });
}

const endBuy = (state, action) => {
    return updateObject(state, {
        performingBuy: false,
        message: action.message
    });
}

const failBuy = (state, action) => {
    return updateObject(state, {
        performingBuy: false,
        jcError: action.error
    });
}

const jcReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_JC_RACES:
            return getJcRacesStart(state, action);
        case actionTypes.RECEIVED_JC_RACES:
            return getJcRacesSuccess(state, action);
        case actionTypes.JC_RACES_FAILED:
            return getJcRacesError(state, action);
        case actionTypes.REQUEST_JC_RACE:
            return getJcRaceStart(state, action);
        case actionTypes.RECEIVED_JC_RACE:
            return getJcRaceSuccess(state, action);
        case actionTypes.JC_RACE_FAILED:
            return getJcRaceError(state, action);
        case actionTypes.JC_BUY_START:
            return startBuy(state, action);
        case actionTypes.JC_BUY_END:
            return endBuy(state, action);
        case actionTypes.JC_BUY_FAIL:
            return failBuy(state, action);
        default:
            return state;

    }
}

export default jcReducer;
