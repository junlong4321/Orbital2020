import React, { Component } from 'react';

import Navbar from "../../components/UI/Navbar/Navbar";

class Stocks extends Component {
    render () {
        return (
            <React.Fragment>
                <Navbar />
                <div style={{color: "white"}}>Stocks</div>
            </React.Fragment>
        );
    }
}

export default Stocks;