import React, { Component } from 'react';

import Navbar from "../../components/UI/Navbar/Navbar";

class News extends Component {
    render () {
        return (
            <React.Fragment>
                <Navbar />
                <div style={{color: "white"}}>News</div>
            </React.Fragment>
        );
    }
}

export default News;