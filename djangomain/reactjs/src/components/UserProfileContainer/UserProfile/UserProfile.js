import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import * as actions from '../../../store/Actions/UserProfile';

const styles = (theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '200px',
        },
    },
    detailsContainer: {
        margin: '3em 0em 1em 0.5em',
    },
    buttonContainer: {
        margin: '1em 0em 3em 0em',
    },
});

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            biography: '',
            linkedin: '',
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.biography = React.createRef();
        this.linkedin = React.createRef();
    }

    componentDidMount() {
        if (this.props.data == null) {
            this.props.onUserProfilePull(localStorage.getItem('email'));
        }
    }

    submitHandler(event) {
        event.preventDefault();
        this.props.onUserProfilePush(
            this.biography.current.value,
            this.linkedin.current.value,
            localStorage.getItem('token'),
            localStorage.getItem('userId')
        );
    }

    render() {
        const { classes } = this.props;

        let email = null;
        let name = null;
        let biography = null;
        let linkedin = null;

        console.log(this.props.data);

        if (this.props.data !== null) {
            const rootData = this.props.data[0];
            email = rootData.email;
            name = rootData.name;
            biography = rootData.biography;
            linkedin = rootData.linkedin;
        }

        return (
            <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={this.submitHandler}
            >
                <Grid item md={12} className={classes.detailsContainer}>
                    <Typography variant="h5" color="primary">
                        Details
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <TextField
                        key={`${Math.floor(Math.random() * 1000)}-min`}
                        id="standard-disabled"
                        label="Email"
                        defaultValue={email}
                        disabled
                        fullWidth="true"
                        style={{ width: '500px' }}
                    />
                </Grid>
                <Grid item md={12}>
                    <TextField
                        key={`${Math.floor(Math.random() * 1000)}-min`}
                        id="standard-disabled"
                        label="Displayed Name"
                        disabled
                        defaultValue={name}
                        fullWidth="true"
                        style={{ width: '500px' }}
                    />
                </Grid>
                <Grid item md={12}>
                    <TextField
                        key={`${Math.floor(Math.random() * 1000)}-min`}
                        id="standard-disabled"
                        label="Biography"
                        multiline
                        rows={3}
                        defaultValue={biography}
                        fullWidth="true"
                        inputRef={this.biography}
                        style={{ width: '500px' }}
                    />
                </Grid>
                <Grid item md={12}>
                    <TextField
                        key={`${Math.floor(Math.random() * 1000)}-min`}
                        id="standard-disabled"
                        label="Linkedin"
                        defaultValue={linkedin}
                        fullWidth="true"
                        inputRef={this.linkedin}
                        style={{ width: '500px' }}
                    />
                </Grid>
                <Grid
                    container
                    item
                    md={12}
                    style={{ paddingTop: '1em', paddingLeft: '0.5em' }}
                >
                    <Typography style={{ color: '#BABABA' }}>
                        Profile Picture
                    </Typography>
                    <Grid item md={12}>
                        <input type="file" accept="image/*" />
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    md={12}
                    justify="flex-end"
                    className={classes.buttonContainer}
                >
                    <Button
                        color="primary"
                        style={{ backgroundColor: '#797979' }}
                        type="submit"
                    >
                        Save
                    </Button>
                </Grid>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.profile.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUserProfilePull: (email) => dispatch(actions.userProfilePull(email)),
        onUserProfilePush: (biography, linkedin, token, userId) =>
            dispatch(
                actions.userProfilePush(biography, linkedin, token, userId)
            ),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(UserProfile));
