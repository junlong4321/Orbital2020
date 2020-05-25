import React from 'react';
import cssClasses from './Navbar.module.css';

import { NavLink } from 'react-router-dom';

const navbar = () => (
    <header className={cssClasses.Navbar}>
        <nav>
            <ul>
                <li><NavLink to="/" exact activeStyle={{color:'orange'}}>Home</NavLink></li>
                <li><NavLink to="/stocks" exact activeStyle={{color:'orange'}}>Stocks</NavLink></li>
                <li><NavLink to="/news" exact activeStyle={{color:'orange'}}>News</NavLink></li>
                <li><NavLink to="/forum" exact activeStyle={{color:'orange'}}>Forum</NavLink></li>
                <li style={{right: 20, float: 'right'}}><NavLink to="/login" exact activeStyle={{color:'orange'}}>Login</NavLink></li>
            </ul>
        </nav>
    </header>
);

export default navbar;