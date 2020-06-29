import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import '../UserProfileContainer/UserProfileContainer.module.css';
import UserProfileNavigation from '../../components/UserProfileNavigation/UserProfileNavigation';
import IndividualAnalysisCard from './IndividualAnalysisCard';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/Analysis';

// styles for class based component
const styles = (theme) => ({
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
});

class AnalysisContainer extends Component {
    // pulls the analysis of the logged in user
    componentDidMount() {
        if (this.props.individualData == null) {
            this.props.onPersonalAnalysisPull(
                localStorage.getItem('token'),
                localStorage.getItem('email')
            );
        }
    }

    render() {
        // set the props for class based material ui styling
        const { classes } = this.props;

        // generates the individual analysis card based on the number of analyses in the database
        let individualAnalysisCard = null;
        const individualData = this.props.individualData;
        if (individualData !== null) {
            individualAnalysisCard = individualData.map((data) => (
                <Grid
                    item
                    container
                    md={5}
                    justify="center"
                    style={{ padding: '2em 1em 4em 1em' }}
                >
                    <IndividualAnalysisCard data={data} />
                </Grid>
            ));
        }

        return (
            <React.Fragment>
                <Grid
                    container
                    item
                    md={12}
                    justify="center"
                    className={classes.typographyContainer}
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
                    className={classes.containerBackground}
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
                    {individualAnalysisCard}
                </Grid>
                <Grid container item md={1} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        individualData: state.analysis.individualAnalysisData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPersonalAnalysisPull: (token, email) =>
            dispatch(actions.individualAnalysisData(token, email)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AnalysisContainer));
