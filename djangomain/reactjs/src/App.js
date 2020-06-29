import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './container/Login/Login';
import Home from './container/Home/Home';
import Stocks from './container/Stocks/Stocks';
import News from './container/News/News';
import SignUp from './container/Login/SignUp/SignUp';
import Profile from './container/Profile/Profile';
import YourAnalysis from './container/YourAnalysis/YourAnalysis';
import './App.css';
import CreateAnalysis from './container/CreateAnalysis/CreateAnalysis';
import GuardedRoute from './components/GuardedRoute/GuardedRoute';
import * as actions from './store/Actions/Auth';
import Copyright from './components/Copyright/Copyright';

class App extends Component {
    componentDidMount() {
        this.props.onAuthCheck();
    }

    render() {
        const auth = this.props.token !== null;
        return (
            <BrowserRouter>
                <div className="App">
                    <Route path="/" exact component={Login} />
                    <Route path="/signup" exact component={SignUp} />
                    <GuardedRoute
                        path="/home"
                        component={Home}
                        auth={auth}
                        exact
                    />
                    <GuardedRoute
                        path="/stocks"
                        component={Stocks}
                        auth={auth}
                        exact
                    />
                    <GuardedRoute
                        path="/News"
                        component={News}
                        auth={auth}
                        exact
                    />
                    <GuardedRoute
                        path="/profile"
                        component={Profile}
                        auth={auth}
                        exact
                    />
                    <GuardedRoute
                        path="/your-analysis"
                        component={YourAnalysis}
                        auth={auth}
                        exact
                    />
                    <GuardedRoute
                        path="/create-analysis"
                        component={CreateAnalysis}
                        auth={auth}
                        exact
                    />
                    <Copyright />
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthCheck: () => dispatch(actions.authCheckState()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
