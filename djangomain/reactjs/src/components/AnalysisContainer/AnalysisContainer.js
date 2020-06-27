import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import '../UserProfileContainer/UserProfileContainer.module.css';
import UserProfileNavigation from '../../components/UserProfileNavigation/UserProfileNavigation';
import IndividualAnalysisCard from './IndividualAnalysisCard';
import SearchBar from '../../components/UI/SearchBar/SearchBar';

const useStyles = makeStyles((theme) => ({
    containerBackground: {
        backgroundColor: '#191919',
        borderRadius: '15px',
        marginBottom: '5em',
    },
    typographyContainer: {
        margin: '1em 0em 1em 0em',
    },
    buttonColor: {
        backgroundColor: '#1B1661',
    },
}));

const AnalysisContainer = (props) => {
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
                    Your Analysis
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
                <Grid
                    item
                    container
                    md={12}
                    justify="flex-end"
                    style={{ margin: '1em 1em 1em 0em' }}
                >
                    <SearchBar />
                </Grid>
                <Grid
                    item
                    container
                    md={12}
                    justify="center"
                    style={{ marginBottom: '4em' }}
                >
                    <IndividualAnalysisCard />
                </Grid>
            </Grid>
            <Grid container item md={1} />
        </React.Fragment>
    );
};

export default AnalysisContainer;
