import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import UserProfileNavigation from '../../components/UserProfileNavigation/UserProfileNavigation';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as actions from '../../store/Actions/CreateAnalysis';
import { withSnackbar } from 'notistack';
import CreateAnalysisSearchbar from '../../components/UI/SearchBar/CreateAnalysisSearchbar';

const styles = (theme) => ({
    containerBackground: {
        backgroundColor: '#191919',
        borderRadius: '15px',
        marginBottom: '5em',
    },
    typographyContainer: {
        margin: '1em 0em 1em 0em',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
});

class AnalysisContainer extends Component {
    state = {
        selectedCompany: '',
    };
    sumbitHandler = (event) => {
        event.preventDefault(); // prevent reloading of the page, when form is submitted.
        console.log(event.target.image.files[0]);
        this.props.onCreateAnalysis(
            localStorage.getItem('token'),
            event.target.image.files[0],
            event.target.title.value,
            event.target.text.value,
            localStorage.getItem('email'),
            localStorage.getItem('name'),
            'DBS'
        );
        this.props.enqueueSnackbar('Analysis successfully created', {
            variant: 'success',
        });
    };

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    onSelectCompany = (value) => {
        this.setState({ selectedCompany: value });
    };

    render() {
        const { classes } = this.props;
        if (this.props.analysisPostSuccess) {
            document.getElementById('createAnalysisForm').reset();
            window.location.reload(false);
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
                        Create New Analysis
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
                    className={classes.containerBackground}
                >
                    <form
                        onSubmit={this.sumbitHandler}
                        className={classes.form}
                        id="createAnalysisForm"
                        onKeyPress={this.onKeyPress}
                    >
                        <Grid container justify="center">
                            <Grid
                                container
                                item
                                md={12}
                                style={{ margin: '1em 1em 1em 1em' }}
                                direction="column"
                                alignItems="flex-start"
                            >
                                <Typography color="secondary" style={{}}>
                                    Company
                                </Typography>
                                <CreateAnalysisSearchbar
                                    onSelectCompany={this.onSelectCompany}
                                />
                                <Typography
                                    color="primary"
                                    variant="h6"
                                    style={{ paddingTop: '1em' }}
                                >
                                    {this.state.selectedCompany}
                                </Typography>
                            </Grid>
                            <Grid
                                container
                                item
                                md={12}
                                justify="flex-start"
                                style={{ margin: '1em 1em 1em 1em' }}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ margin: '1em 1em 1em 1em' }}
                                    name="image"
                                />
                            </Grid>
                            <TextField
                                variant="outlined"
                                fullWidth={true}
                                placeholder="Title"
                                style={{ margin: '1em 1em 1em 1em' }}
                                name="title"
                            />
                            <TextField
                                variant="outlined"
                                fullWidth={true}
                                multiline={true}
                                rows={20}
                                placeholder="Start writing..."
                                name="text"
                                style={{ margin: '1em 1em 1em 1em' }}
                            />
                            <Button
                                type="submit"
                                style={{
                                    backgroundColor: '#1B1661',
                                    margin: '1.5em 1em 1.5em 0em',
                                }}
                            >
                                Post
                            </Button>
                        </Grid>
                    </form>
                </Grid>
                <Grid container item md={1} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        analysisError: state.createAnalysis.error,
        analysisPostSuccess: state.createAnalysis.success,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateAnalysis: (token, image, title, text, email, name, stockName) =>
            dispatch(
                actions.createAnalysis(
                    token,
                    image,
                    title,
                    text,
                    email,
                    name,
                    stockName
                )
            ),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(withSnackbar(AnalysisContainer)));
