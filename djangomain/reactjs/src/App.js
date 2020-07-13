import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
import Navbar from './components/UI/Navbar/Navbar';

class App extends Component {
    state = {
        search: '',
        help: false,
    };

    onSearchChange = (event) => {
        this.setState({ search: event.target.value });
        console.log(this.state.search);
    };

    componentDidMount() {
        this.props.onAuthCheck();
    }

    stockSearchHandler = () => {
        this.props.history.replace('/stocks');
    };

    keyPress = (e) => {
        if (e.keyCode == 13) {
            this.setState({ help: true });
        }
    };

    render() {
        if (this.state.help) {
            return <Redirect to="/stocks" />;
        }
        const auth = localStorage.getItem('token') !== null;
        const navbar = (
            <Navbar
                onSearchChange={this.onSearchChange}
                keyPress={this.keyPress}
            />
        );
        return (
            <div className="App">
                <Route path="/" exact component={Login} />
                <Route path="/signup" exact component={SignUp} />
                {auth ? navbar : null}

                <GuardedRoute path="/home" component={Home} auth={auth} exact />
                <GuardedRoute path="/stocks" component={Stocks} auth={auth} />
                <GuardedRoute path="/News" component={News} auth={auth} exact />
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
            </div>
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
