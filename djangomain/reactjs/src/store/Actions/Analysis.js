import * as actionTypes from './ActionTypes';
import axiosDb from '../../components/axios/axiosDb';

export const analysisPull = (data) => {
    return {
        type: actionTypes.ANALYSIS_PULL,
        analysisData: data,
    };
};

export const analysisPullFail = (error) => {
    return {
        type: actionTypes.ANALYSIS_PULL_FAIL,
        error: error,
    };
};

export const individualAnalysisPull = (data) => {
    return {
        type: actionTypes.INDIVIDUAL_ANALYSIS_PULL,
        individualAnalysisData: data,
    };
};

export const specificAnalysisPull = (data) => {
    return {
        type: actionTypes.SPECIFIC_ANALYSIS_PULL,
        specificAnalysisData: data,
    };
};

export const analysisData = (token) => {
    return (dispatch) => {
        axiosDb
            .get('/api/analyses/')
            .then((response) => {
                dispatch(analysisPull(response.data));
            })
            .catch((error) => {
                dispatch(analysisPullFail(error));
            });
    };
};

export const specificAnalysisData = (token, company) => {
    return (dispatch) => {
        axiosDb
            .get(`/api/analyses/?search=${company}`)
            .then((response) => {
                dispatch(analysisPull(response.data));
            })
            .catch((error) => {
                dispatch(analysisPullFail(error));
            });
    };
};

export const individualAnalysisData = (token, email) => {
    return (dispatch) => {
        axiosDb
            .get(`/api/analyses/?search=${email}`)
            .then((response) => {
                dispatch(individualAnalysisPull(response.data));
            })
            .catch((error) => dispatch(analysisPullFail(error)));
    };
};
