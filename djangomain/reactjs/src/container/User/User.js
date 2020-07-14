import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Route, withRouter } from 'react-router-dom';
import PublicUserProfile from '../../components/PublicUserProfile/PublicUserProfile';

const User = () => {
    return (
        <Grid container style={{ marginTop: '4em' }}>
            <Grid item container md={1}></Grid>
            <Grid
                item
                container
                md={10}
                style={{ backgroundColor: 'rgba(20, 20, 20, 0.8)' }}
            >
                <Route
                    exact
                    path="/user/:name"
                    component={withRouter(PublicUserProfile)}
                />
            </Grid>
            <Grid item container md={1}></Grid>
        </Grid>
    );
};

export default User;
