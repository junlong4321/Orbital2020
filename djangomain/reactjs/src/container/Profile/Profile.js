import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import Navbar from '../../components/UI/Navbar/Navbar';
import UserProfileContainer from '../../components/UserProfileContainer/UserProfileContainer';
import styles from './Profile.module.css';

class Profile extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Grid
                    container
                    item
                    direction="row"
                    justify="center"
                    alignContent="center"
                >
                    <Grid container item md={1} />
                    <Grid
                        container
                        item
                        direction="row"
                        justify="center"
                        alignContent="center"
                        style={{
                            background: 'rgba(20, 20, 20, 0.8)',
                            margin: '5em 0em 5em 0em',
                        }}
                        md={10}
                    >
                        <UserProfileContainer />
                    </Grid>
                    <Grid container item md={1} />
                </Grid>
            </React.Fragment>
        );
    }
}

export default Profile;
