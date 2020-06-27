import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IndividualComments from './IndividualComments/IndividualComments';

const useStyles = makeStyles((theme) => ({
    commentsSpacing: {
        marginTop: '1.5em',
    },
    buttonSpacing: {
        margin: '1.5em 0em 1em 0em',
        backgroundColor: '#1B1661',
    },
}));

const CommentsContainer = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h5" className={classes.commentsSpacing}>
                Comments
            </Typography>
            <TextField
                variant="outlined"
                fullWidth={true}
                multiline={true}
                rows={3}
                placeholder="Join in the discusssion"
                className={classes.commentsSpacing}
            />
            <Grid container md={12} justify="flex-end">
                <Button className={classes.buttonSpacing}>Post</Button>
            </Grid>
            <IndividualComments />
            <IndividualComments />
            <IndividualComments />
            <IndividualComments />
        </div>
    );
};

export default CommentsContainer;
