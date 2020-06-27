import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
}));

const UserProfile = () => {
    const styles = useStyles();
    return (
        <form className={styles.root} noValidate autoComplete="off">
            <Grid item md={12} className={styles.detailsContainer}>
                <Typography variant="h5" color="primary">
                    Details
                </Typography>
            </Grid>
            <Grid item md={12}>
                <TextField
                    required
                    id="standard-required"
                    label="Email"
                    disabled
                    defaultValue="Hello World"
                    fullWidth="true"
                    style={{ width: '500px' }}
                />
            </Grid>
            <Grid item md={12}>
                <TextField
                    id="standard-disabled"
                    label="Displayed Name"
                    defaultValue="Hello World"
                    fullWidth="true"
                    style={{ width: '500px' }}
                />
            </Grid>
            <Grid item md={12}>
                <TextField
                    id="standard-disabled"
                    label="Credentials"
                    defaultValue="Hello World"
                    fullWidth="true"
                    style={{ width: '500px' }}
                />
            </Grid>
            <Grid item md={12}>
                <TextField
                    id="standard-disabled"
                    label="Registered date"
                    defaultValue="Hello World"
                    fullWidth="true"
                    style={{ width: '500px' }}
                />
            </Grid>
            <Grid
                container
                item
                md={12}
                justify="flex-end"
                className={styles.buttonContainer}
            >
                <Button color="primary" style={{ backgroundColor: '#797979' }}>
                    Save
                </Button>
            </Grid>
        </form>
    );
};

export default UserProfile;
