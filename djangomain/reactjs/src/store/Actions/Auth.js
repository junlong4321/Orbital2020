import * as actionTypes from './ActionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        email: email,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const signUpFail = (error) => {
    return {
        type: actionTypes.SIGN_UP_FAIL,
        error: error,
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    return {
        type: actionTypes.LOGOUT,
    };
};

export const signUp = (email, password, username) => {
    return (dispatch) => {
        dispatch(authStart());
        const signUpData = {
            email: email,
            password: password,
            name: username,
        };
        const authData = {
            username: email,
            password: password,
        };
        axios
            .post('http://127.0.0.1:8000/api/users/', signUpData)
            .then((response) => {
                axios
                    .post('http://127.0.0.1:8000/api/auth/', authData)
                    .then((response1) => {
                        const userToken = response1.data.token;
                        const id = response.data.id;
                        localStorage.setItem('token', userToken);
                        localStorage.setItem('email', email);
                        localStorage.setItem('name', username);
                        localStorage.setItem('userId', id);
                        dispatch(authSuccess(userToken, email));
                    })
                    .catch((error) => {
                        dispatch(authFail(error));
                    });
            })
            .catch((error) => {
                dispatch(signUpFail(error));
            });
    };
};

export const auth = (email, password) => {
    return (dispatch) => {
        // autheticate the user
        dispatch(authStart());
        const authData = {
            username: email,
            password: password,
        };
        axios
            .post('http://127.0.0.1:8000/api/auth/', authData)
            .then((response) => {
                axios
                    .get(`http://127.0.0.1:8000/api/users/?search=${email}`)
                    .then((response1) => {
                        console.log(response1);
                        const name = response1.data[0].name;
                        const id = response1.data[0].id;
                        const userToken = response.data.token;
                        const profilePicture =
                            response1.data[0].profile_picture;
                        console.log(profilePicture);
                        localStorage.setItem('token', userToken);
                        localStorage.setItem('email', email);
                        localStorage.setItem('name', name);
                        localStorage.setItem('userId', id);
                        localStorage.setItem('profilePicture', profilePicture);
                        dispatch(authSuccess(userToken, email));
                    })
                    .catch((error) => dispatch(authFail(error)));
            })
            .catch((error) => {
                dispatch(authFail(error));
            });
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token));
        }
    };
};
