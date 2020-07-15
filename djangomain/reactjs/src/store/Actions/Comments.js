import * as actionTypes from './ActionTypes';
import axiosDb from '../../components/axios/axiosDb';

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

        axiosDb
            .get(`/api/comments/?search=${id}`)
            .then((response) => {
                dispatch(commentsPullSuccess(response.data));
            })
            .catch((error) => {
                dispatch(commentsPullFailure(error));
            });
    };
};

export const commentsPost = (email, name, id, commentText, token) => {
    return (dispatch) => {
        dispatch(commentsPostStart());
        const postData = {
            commenter: email,
            commenter_names: name,
            analysis: id,
            comment: commentText,
        };
        axiosDb
            .post('/api/comments/', postData)
            .then((response) => {
                dispatch(commentsPostSuccess());
                dispatch(commentsPull(id, token));
            })
            .catch((error) => {
                dispatch(commentsPostFailure(error));
            });
    };
};
