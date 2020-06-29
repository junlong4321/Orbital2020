import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import './UserProfileContainer.module.css';
import UserProfileNavigation from '../../components/UserProfileNavigation/UserProfileNavigation';
import UserProfile from './UserProfile/UserProfile';

const useStyles = makeStyles((theme) => ({
    containerBackground: {
        backgroundColor: '#191919',
        borderRadius: '15px',
        marginBottom: '5em',
    },
    typographyContainer: {
        margin: '1em 0em 1em 0em',
    },
}));

const UserProfileContainer = (props) => {
    const styles = useStyles();
    return (
        <React.Fragment>
            <Grid
                container
                item
                md={12}
                justify="center"
                className={styles.typographyContainer}
            >
                <Typography variant="h3" color="primary" align="center">
                    User Profile
                </Typography>
            </Grid>
            <Grid container item md={1} />
            <Grid item md={2} container>
                <UserProfileNavigation />
            </Grid>
            <Grid
                item
                md={8}
                container
                direction="row"
                justify="center"
                alignContent="center"
                className={styles.containerBackground}
            >
                <UserProfile />
            </Grid>
            <Grid container item md={1} />
        </React.Fragment>
    );
};

export default UserProfileContainer;
