import React, { Component } from 'react';
import Dropdown from 'react-dropdown';

import style from './SearchBar.module.css';

class SearchBar extends Component {
    state = {
        searchCategory : [
            {
                id: 0,
                name: 'Ticker',
                selected: true
            },
            {
                id: 1,
                name: 'User',
                selected:false
            }
        ]
    }
    render () {
        const options = ['Ticker', 'User'];
        const defaultOption = options[0];
        return (
            <div>
                <Dropdown options={options} value={defaultOption} className={style.dropdown} />
            </div>
        );
    }
}


export default SearchBar;