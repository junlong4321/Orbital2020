import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import * as actions from '../../../store/Actions/UserProfile';
import axiosDb from '../../axios/axiosDb';

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
            pushSuccess: false,
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
    componentDidUpdate(prevProps, prevState) {
        console.log(this.state.pushSuccess);
        if (this.state.pushSuccess) {
            const userId = localStorage.getItem('userId');
            if (this.props.pushSuccess) {
                axiosDb.get(`/api/users/${userId}`).then((response) => {
                    localStorage.setItem(
                        'profilePicture',
                        response.data.profile_picture
                    );
                    console.log(localStorage.getItem('profilePicture'));
                    window.location.reload(true);
                });
            }
        }
    }

    submitHandler(event) {
        event.preventDefault();
        const image = event.target.image.files[0];
        let linkedinValue = '';
        let linkedinErrorChecker = false;
        const linkedinCurrentValue = this.linkedin.current.value;
        if (linkedinCurrentValue !== '') {
            try {
                if (linkedinCurrentValue.slice(0, 16) !== 'www.linkedin.com') {
                    console.log(linkedinCurrentValue.slice(0, 16));
                    linkedinErrorChecker = true;
                }
            } catch (error) {
                linkedinErrorChecker = true;
            }

            linkedinValue = 'https://' + linkedinCurrentValue;
        }

        if (!linkedinErrorChecker) {
            this.props.onUserProfilePush(
                this.biography.current.value,
                linkedinValue,
                image,
                localStorage.getItem('userId')
            );
            this.props.enqueueSnackbar('Profile successfully updated', {
                variant: 'success',
            });
            this.setState({ pushSuccess: true });
        } else {
            this.props.enqueueSnackbar(
                'Error updating profile, please check your linkedin url',
                {
                    variant: 'error',
                }
            );
        }
    }

    keyPressHandler(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    render() {
        const { classes } = this.props;

        let email = null;
        let name = null;
        let biography = null;
        let linkedin = null;

        if (this.props.data !== null) {
            const rootData = this.props.data[0];
            email = rootData.email;
            name = rootData.name;
            biography = rootData.biography;
            linkedin = rootData.linkedin;
            if (linkedin !== '' && linkedin !== null) {
                linkedin = linkedin.slice(8, linkedin.length);
            }
        }

        return (
            <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={this.submitHandler}
                onKeyPress={this.keyPressHandler}
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
                        rows={10}
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
                        <input
                            type="file"
                            accept="image/*"
                            name="image"
                            style={{ color: 'white' }}
                        />
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
                        style={{ backgroundColor: '#1B1661' }}
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
        pushSuccess: state.profile.pushSuccess,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUserProfilePull: (email) => dispatch(actions.userProfilePull(email)),
        onUserProfilePush: (biography, linkedin, image, userId) =>
            dispatch(
                actions.userProfilePush(biography, linkedin, image, userId)
            ),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(withSnackbar(UserProfile)));
