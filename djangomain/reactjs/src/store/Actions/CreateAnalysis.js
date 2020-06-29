import * as actionTypes from './ActionTypes';
import axios from 'axios';

export const createAnalysisStart = () => {
    return {
        type: actionTypes.CREATE_ANALYSIS_START,
    };
};

export const createAnalysisSuccess = (response) => {
    return {
        type: actionTypes.CREATE_ANALYSIS_SUCCESS,
        response: response,
    };
};

export const createAnalysisFailure = (error) => {
    return {
        type: actionTypes.CREATE_ANALYSIS_FAILURE,
        error: error,
    };
};

export const createAnalysis = (
    token,
    image,
    title,
    text,
    email,
    name,
    stockName
) => {
    return (dispatch) => {
        dispatch(createAnalysisStart());
        const config = {
            headers: {
                Authorization: 'Token ' + { token },
            },
        };
        const analysisData = {
            images: image,
            title: title,
            text: text,
            author: email,
            name: name,
            stock: stockName,
        };
        // console.log(analysisData);
        // console.log(token, 'token');
        axios
            .post('http://127.0.0.1:8000/api/analyses/', analysisData, config)
            .then((response) => {
                dispatch(createAnalysisSuccess(response));
                // console.log(response);
            })
            .catch((error) => {
                dispatch(createAnalysisFailure(error));
                // console.log(error);
            });
    };
};
