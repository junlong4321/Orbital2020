import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import IndividualComments from './IndividualComments/IndividualComments';
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/Comments';
import { withSnackbar } from 'notistack';

const styles = (theme) => ({
    commentsSpacing: {
        marginTop: '1.5em',
    },
    buttonSpacing: {
        margin: '1.5em 0em 1em 0em',
        backgroundColor: '#1B1661',
    },
});

class CommentsContainer extends Component {
    componentDidMount() {
        // pulling of comments data
        this.props.onCommentsPull(this.props.id, localStorage.getItem('token'));
    }

    // handles posting of a comment. Data posted to the server.
    submitHandler = (event) => {
        event.preventDefault();
        const commentText = event.target.text.value;
        this.props.onCommentsPost(
            localStorage.getItem('email'),
            localStorage.getItem('name'),
            this.props.id,
            commentText,
            localStorage.getItem('token')
        );
        document.getElementById('commentForm').reset();
        this.props.enqueueSnackbar('Comment posted', {
            variant: 'success',
        });
    };

    render() {
        // populating comments
        const commentsData = this.props.commentsData;
        const finalCommentsData = Object.assign([], commentsData).reverse();
        let comments = null;
        if (commentsData !== null) {
            comments = finalCommentsData.map((comment) => (
                <IndividualComments data={comment} />
            ));
        }

        // class based material ui styling
        const { classes } = this.props;

        return (
            <div>
                <Typography variant="h5" className={classes.commentsSpacing}>
                    Comments
                </Typography>
                <form onSubmit={this.submitHandler} id="commentForm">
                    <TextField
                        variant="outlined"
                        fullWidth={true}
                        multiline={true}
                        rows={3}
                        name="text"
                        placeholder="Join in the discusssion"
                        className={classes.commentsSpacing}
                    />
                    <Grid container md={12} justify="flex-end">
                        <Button className={classes.buttonSpacing} type="submit">
                            Post
                        </Button>
                    </Grid>
                </form>
                {comments}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        commentsData: state.comments.commentsData,
        commentsPostSuccess: state.comments.commentsPostSuccess,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCommentsPull: (id, token) =>
            dispatch(actions.commentsPull(id, token)),
        onCommentsPost: (email, name, id, commentText, token) =>
            dispatch(actions.commentsPost(email, name, id, commentText, token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(withSnackbar(CommentsContainer)));
