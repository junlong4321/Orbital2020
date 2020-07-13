import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link1 from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import logo from '../../assets/the-free-market-logo.png';
import Copyright from '../../components/Copyright/Copyright';
import { Link } from 'react-router-dom';
import * as actions from '../../store/Actions/Auth';
import { connect } from 'react-redux';

const styles = (theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignIn extends Component {
    sumbitHandler = (event) => {
        event.preventDefault(); // prevent reloading of the page, when form is submitted.
        const email = event.target.email.value;
        const password = event.target.password.value;
        this.props.onAuth(email, password);
    };

    render() {
        const theme = createMuiTheme({
            palette: {
                type: 'dark',
            },
        });

        // redirects user to home page once authentication is successful
        if (this.props.auth) {
            this.props.history.replace('/home');
        }

        let errorMessage = null;
        if (this.props.error !== null) {
            errorMessage = (
                <Grid item container justify="center">
                    <Typography
                        variant="body2"
                        style={{
                            color: 'red',
                            margin: '0em 0em -0.5em 0em',
                        }}
                    >
                        Incorrect Username or Password
                    </Typography>
                </Grid>
            );
        }

        const { classes } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <div style={{ height: '8vh' }} />
                <Container
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                    component="main"
                    maxWidth="xs"
                >
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar} src={logo}></Avatar>
                        <Typography component="h1" variant="h5">
                            The Free Market
                        </Typography>
                        <form
                            className={classes.form}
                            onSubmit={this.sumbitHandler}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            {errorMessage}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign in
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link>
                                        <Link1 variant="body2">
                                            Forgot password?
                                        </Link1>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/signup">
                                        <Link1 variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link1>
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        auth: state.auth.auth,
        error: state.auth.signInError,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SignIn));
