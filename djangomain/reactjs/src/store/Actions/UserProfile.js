import * as actionTypes from '../Actions/ActionTypes';
import axiosDb from '../../components/axios/axiosDb';

export const userProfilePullStart = () => {
    return {
        type: actionTypes.USER_PROFILE_PULL_START,
    };
};

export const userProfilePullSuccess = (data) => {
    return {
        type: actionTypes.USER_PROFILE_PULL_SUCCESS,
        data: data,
    };
};

export const userProfilePullFail = (error) => {
    return {
        type: actionTypes.USER_PROFILE_PULL_FAIL,
        error: error,
    };
};

export const userProfilePushStart = () => {
    return {
        type: actionTypes.USER_PROFILE_PUSH_START,
    };
};

export const userProfilePushSuccess = () => {
    return {
        type: actionTypes.USER_PROFILE_PUSH_SUCCESS,
    };
};

export const userProfilePushFail = (error) => {
    return {
        type: actionTypes.USER_PROFILE_PUSH_FAIL,
        error: error,
    };
};

export const userProfilePull = (email) => {
    return (dispatch) => {
        dispatch(userProfilePullStart());
        axiosDb
            .get(`/api/users/?search=${email}`)
            .then((response) => {
                dispatch(userProfilePullSuccess(response.data));
            })
            .catch((error) => {
                dispatch(userProfilePullFail(error));
            });
    };
};

export const userProfilePush = (biography, linkedin, token, userId) => {
    return (dispatch) => {
        dispatch(userProfilePushStart());
        const postData = {
            biography: biography,
            linkedin: linkedin,
        };
        const config = {
            headers: {
                Authorization: 'Token ' + token,
            },
        };
        axiosDb
            .patch(`/api/users/${userId}/`, postData, config)
            .then((response) => {
                dispatch(userProfilePushSuccess());
            })
            .catch((error) => {
                dispatch(userProfilePushFail(error));
            });
    };
};
