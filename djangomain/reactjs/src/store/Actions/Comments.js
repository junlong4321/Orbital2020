import * as actionTypes from './ActionTypes';
import axios from 'axios';

export const commentsPullStart = () => {
    return {
        type: actionTypes.COMMENT_PULL_START,
    };
};

export const commentsPullSuccess = (commentsData) => {
    return {
        type: actionTypes.COMMENT_PULL_SUCCESS,
        data: commentsData,
    };
};

export const commentsPullFailure = (error) => {
    return {
        type: actionTypes.COMMENT_PULL_FAILURE,
        error: error,
    };
};

export const commentsPostStart = () => {
    return {
        type: actionTypes.COMMENT_POST_START,
    };
};

export const commentsPostSuccess = () => {
    return {
        type: actionTypes.COMMENT_POST_SUCCESS,
    };
};

export const commentsPostFailure = (error) => {
    return {
        type: actionTypes.COMMENT_POST_FAILURE,
        error: error,
    };
};

export const commentsPull = (id, token) => {
    return (dispatch) => {
        dispatch(commentsPullStart());
        const pullData = {
            Authorization: 'Token ' + { token },
        };

        axios
            .get(`http://127.0.0.1:8000/api/comments/?search=${id}`, pullData)
            .then((response) => {
                dispatch(commentsPullSuccess(response.data));
            })
            .catch((error) => {
                dispatch(commentsPullFailure(error));
            });
    };
};

export const commentsPost = (name, id, commentText, token) => {
    return (dispatch) => {
        dispatch(commentsPostStart());
        const postData = {
            commenter: name,
            analysis: id,
            comment: commentText,
        };
        const config = {
            headers: {
                Authorization: 'Token ' + { token },
            },
        };
        axios
            .post('http://127.0.0.1:8000/api/comments/', postData, config)
            .then((response) => {
                dispatch(commentsPostSuccess());
                dispatch(commentsPull(id, token));
            })
            .catch((error) => {
                dispatch(commentsPostFailure(error));
            });
    };
};
