import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link1 from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Copyright from '../../../components/Copyright/Copyright';
import { connect } from 'react-redux';
import * as actions from '../../../store/Actions/Auth';

const styles = (theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignUp extends Component {
    signUpHandler = (event) => {
        event.preventDefault(); // prevent reloading of the page, when form is submitted.
        const email = event.target.email.value;
        const password = event.target.password.value;
        const username = event.target.username.value;
        this.props.onSignUp(email, password, username);
    };
    render() {
        const { classes } = this.props;
        const theme = createMuiTheme({
            palette: {
                type: 'dark',
            },
        });

        let errorMessage = null;
        if (this.props.error !== null) {
            errorMessage = (
                <Grid item container justify="center">
                    <Typography
                        variant="body2"
                        style={{
                            color: 'red',
                            margin: '1em 0em -1em 0em',
                        }}
                    >
                        Email already exists
                    </Typography>
                </Grid>
            );
        }

        // redirects user to home page once sign up is successful
        if (this.props.auth) {
            this.props.history.replace('/home');
            window.location.reload(true);
        }

        return (
            <ThemeProvider theme={theme}>
                <div style={{ height: '8vh' }} />
                <Container
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                    component="main"
                    maxWidth="xs"
                >
                    <CssBaseline />
                    <div className={classes.paper} style={{ padding: '30px' }}>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form
                            className={classes.form}
                            onSubmit={this.signUpHandler}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Username"
                                        name="username"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                </Grid>
                            </Grid>
                            {errorMessage}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link to="/">
                                        <Link1 variant="body2">
                                            Already have an account? Sign in
                                        </Link1>
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={1}>
                        <Copyright />
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignUp: (email, password, username) =>
            dispatch(actions.signUp(email, password, username)),
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        auth: state.auth.auth,
        error: state.auth.signUpError,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SignUp));
