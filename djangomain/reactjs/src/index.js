import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import authReducer from './store/Reducers/AuthReducer';
import analysisReducer from './store/Reducers/AnalysisReducer';
import userProfile from './store/Reducers/UserProfile';
import createAnalysis from './store/Reducers/CreateAnalysis';
import comments from './store/Reducers/Comments';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    analysis: analysisReducer,
    profile: userProfile,
    createAnalysis: createAnalysis,
    comments: comments,
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
const app = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <SnackbarProvider>
                    <App />
                </SnackbarProvider>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
