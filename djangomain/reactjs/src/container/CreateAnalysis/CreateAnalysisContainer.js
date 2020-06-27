import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import UserProfileNavigation from '../../components/UserProfileNavigation/UserProfileNavigation';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
                alignContent="center"
                className={styles.containerBackground}
            >
                <Grid
                    item
                    container
                    md={4}
                    xs={12}
                    justify="flex-start"
                    style={{ margin: '1em 0em 0em 1em' }}
                >
                    <SearchBar />
                </Grid>
                <Grid
                    item
                    container
                    md={4}
                    xs={12}
                    justify="flex-start"
                    style={{ margin: '1em 0em 0em 0em' }}
                >
                    <Typography variant="body1" color="primary">
                        DBS
                    </Typography>
                </Grid>
                <Grid
                    item
                    container
                    md={12}
                    xs={12}
                    style={{ margin: '1em 0em 0em 1em' }}
                >
                    <input type="file" />
                </Grid>
                <Grid
                    item
                    container
                    md={12}
                    xs={12}
                    justify="center"
                    alignContent="center"
                    style={{ margin: '2em 1em 0em 1em' }}
                >
                    <TextField
                        variant="outlined"
                        fullWidth={true}
                        placeholder="Title"
                    />
                </Grid>
                <Grid
                    item
                    container
                    md={12}
                    xs={12}
                    justify="center"
                    alignContent="center"
                    style={{ margin: '2em 1em 0em 1em' }}
                >
                    <TextField
                        variant="outlined"
                        fullWidth={true}
                        multiline={true}
                        rows={10}
                        placeholder="Start writing..."
                    />
                </Grid>
                <Grid item container md={12} xs={12} justify="flex-end">
                    <Button
                        style={{
                            backgroundColor: '#1B1661',
                            margin: '1.5em 1em 1.5em 0em',
                        }}
                    >
                        Post
                    </Button>
                </Grid>
            </Grid>
            <Grid container item md={1} />
        </React.Fragment>
    );
};

export default AnalysisContainer;
