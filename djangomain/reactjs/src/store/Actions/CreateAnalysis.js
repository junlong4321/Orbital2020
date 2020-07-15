import * as actionTypes from './ActionTypes';
import axiosDb from '../../components/axios/axiosDb';

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

export const createAnalysis = (image, title, text, email, name, ticker) => {
    return (dispatch) => {
        dispatch(createAnalysisStart());
        const analysisData = {
            images: image,
            title: title,
            text: text,
            author: email,
            name: name,
            ticker: ticker,
        };
        axiosDb
            .post('/api/analyses/', analysisData)
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
