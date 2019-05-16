import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = err => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post("http://localhost:8000/rest-auth/login/", {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000); //Expiration date 1 hour after
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('username', username);

            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600 * 24));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post("http://localhost:8000/rest-auth/registration/", {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 24 * 1000); //Expiration date 1 day after
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('username', username);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600 * 24));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authChangeProfile = (old_username, new_username, new_email, new_password) => {
    return dispatch => {
        if(new_password === undefined) {
            new_password = "";
        }
        dispatch(authStart());
        axios.patch(`http://localhost:8000/api/users/${old_username}/change/`, {
            username: new_username,
            email: new_email,
            password: new_password
        })
        .then(res => {
            localStorage.setItem('username', new_username);
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token === undefined) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logout());
            }
            else {
                dispatch(authSuccess(token));
                const expirationTime = (expirationDate.getTime() - new Date().getTime()) / 1000;
                dispatch(checkAuthTimeout(expirationTime));
            }
        }
    }
}

export const getUserInfoStart = () => {
    return {
        type: actionTypes.GET_USER_INFO_START
    }
}

export const getUserInfoEnd = (user) => {
    return {
        type: actionTypes.GET_USER_INFO_END,
        payload: {
            user: user
        }
    }
}

export const getUserInfoError = (err) => {
    return {
        type: actionTypes.GET_USER_INFO_ERROR,
        error: err
    }
}

export const getLevelInfoStart = () => {
    return {
        type: actionTypes.GET_USER_LEVEL_INFO_START
    }
}

export const getLevelInfoEnd = (level) => {
    return {
        type: actionTypes.GET_USER_LEVEL_INFO_END,
        payload: {
            level: level
        }
    }
}

export const getLevelInfoError = (err) => {
    return {
        type: actionTypes.GET_USER_LEVEL_INFO_ERROR,
        error: err
    }
}

export const getLevel = (lvl) => {
    return dispatch => {
        dispatch(getLevelInfoStart());

        const token = localStorage.getItem('token');
        if(token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        }
        else {
            axios.defaults.headers = {
                "Content-Type": "application/json"
            }
        }
        axios.get(`http://localhost:8000/api/users/expmap/${lvl}/`)
        .then(res => {
            const level = res.data;
            dispatch(getLevelInfoEnd(level));
        })
        .catch(err => {
            dispatch(getLevelInfoError(err));
        });
    }
}

export const getUser = (username) => {
    return dispatch => {
        dispatch(getUserInfoStart());
        const token = localStorage.getItem('token');

        if(token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        }
        else {
            axios.defaults.headers = {
                "Content-Type": "application/json"
            }
        }
        axios.get(`http://localhost:8000/api/users/${username}/info/`)
        .then(res => {
            const user = res.data;
            dispatch(getUserInfoEnd(user));
            dispatch(getLevel(user.level));
        })
        .catch(err => {
            dispatch(getUserInfoError(err));
        })
    }
}

export const requestUsers = () => {
    return {
        type: actionTypes.REQUEST_USERS
    }
}

export const receiveUsers = (users) => {
    return {
        type: actionTypes.RECEIVE_USERS,
        payload: {
            users: users
        }
    }
}

export const failUsers = (err) => {
    return {
        type: actionTypes.FAIL_USERS,
        error: err
    }
}

export const getUsers = (user) => {
    return dispatch => {
        dispatch(requestUsers());

        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }

        axios.get(`http://localhost:8000/api/users/${user}/all`)
        .then(res => {
            const users = res.data;
            dispatch(receiveUsers(users));
        })
        .catch(err => {
            dispatch(failUsers(err));
        })
    }
}
