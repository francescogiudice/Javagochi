import * as actionTypes from './actionTypes';
import axios from 'axios';

export const requestJcRaces = () => {
    return {
        type: actionTypes.REQUEST_JC_RACES
    }
}

export const requestJcRace = () => {
    return {
        type: actionTypes.REQUEST_JC_RACE
    }
}

export const jcBuyStart = () => {
    return {
        type: actionTypes.JC_BUY_START
    }
}

// TODO: consider adding a received at parameter
export const receiveJcRaces = (javagochis) => {
    return {
        type: actionTypes.RECEIVED_JC_RACES,
        payload: {
            jcRaces: javagochis
        }
    }
}

// TODO: consider adding a received at parameter
export const receiveJcRace = (javagochi) => {
    return {
        type: actionTypes.RECEIVED_JC_RACE,
        payload: {
            selectedRace: javagochi
        }
    }
}

export const jcBuyEnd = (res) => {
    return {
        type: actionTypes.JC_BUY_END,
        message: res
    }
}

export const failJcRaces = (err) => {
    return {
        type: actionTypes.JC_RACES_FAILED,
        error: err
    }
}

export const failJcRace = (err) => {
    return {
        type: actionTypes.JC_RACE_FAILED,
        error: err
    }
}

export const jcBuyFail = (err) => {
    return {
        type: actionTypes.JC_BUY_FAIL,
        error: err
    }
}

export const getJcRaces = () => {
    return dispatch => {
        dispatch(requestJcRaces());
        axios.get('http://localhost:8000/api/javagochi/market/')
        .then(res => {
            const javagochis = res.data;
            dispatch(receiveJcRaces(javagochis));
        })
        .catch(err => {
            dispatch(failJcRaces(err))
        })
    }
}

export const getJcRace = (race) => {
    return dispatch => {
        dispatch(requestJcRace());
        axios.get(`http://localhost:8000/api/javagochi/${race}`)
        .then((res) => {
            const javagochi = res.data;
            dispatch(receiveJcRace(javagochi));
        })
        .catch(err => {
            dispatch(failJcRace(err))
        });
    }
}

export const buyJavagochi = (race, user, nickname) => {
    return dispatch => {
        dispatch(jcBuyStart());

        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post("http://localhost:8000/api/javagochi/buy/", {
          user: user,
          race: race,
          nickname: nickname
        })
        .then((res) => {
            const message = res.data;
            dispatch(jcBuyEnd(message));
        })
        .catch(err => {
            dispatch(jcBuyFail(err))
        });
    }
}
