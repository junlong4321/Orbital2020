import React, { Component } from 'react';

import style from './Login.module.css';
import { Link } from 'react-router-dom';

class Login extends Component {
    render () {
        return (
            <div className={style.Login}>
                <form>
                    <input type="text" placeholder="Email" required="required" />
                    <input type="password" placeholder="Password" required="required" />
                    <div>
                        <ul>
                            <li><Link to={{pathname: this.props.match.url + '/create-account'}}>New User?</Link></li>
                            <li><Link to={{pathname: this.props.match.url + '/forget-password'}}>Forget Password?</Link></li>
                        </ul>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;