import * as actionTypes from './ActionTypes';
import axios from 'axios';

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

export const analysisData = (token) => {
    return (dispatch) => {
        const pullData = {
            Authorization: 'Token ' + { token },
        };
        axios
            .get('http://127.0.0.1:8000/api/analyses/', pullData)
            .then((response) => {
                console.log(response.data);
                dispatch(analysisPull(response.data));
            })
            .catch((error) => {
                dispatch(analysisPullFail(error));
            });
    };
};
