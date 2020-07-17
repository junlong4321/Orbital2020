import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import CommentIcon from '@material-ui/icons/Comment';
import moment from '../moment/moment';
import axiosDb from '../axios/axiosDb';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    root: {},
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
}));
const IndividualAnalysisCard = (props) => {
    const [numOfComments, setNumOfComments] = useState(0);
    useEffect(() => {
        axiosDb
            .get(`/api/comments/?search=${props.data.id}`)
            .then((response) => setNumOfComments(response.data.length))
            .catch((error) => console.log(error));
    });
    let title = '';
    let date = '';
    let text = '';
    let image = null;
    // to ensure that initial render of component shows blank, no error thrown. populate with correct data after analysis data is pulled
    if (props.data !== null) {
        title = props.data.title;
        date = moment(props.data.created_date);
        text = props.data.text;
        image = props.data.cover_image;
    }
    const analysisId = props.data.id;
    const history = useHistory();
    const onEditHandler = () => {
        history.push(`/edit/${analysisId}`);
        window.location.reload(true);
    };

    const classes = useStyles();

    // delete dialog button
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        axiosDb
            .delete(`/api/analyses/${analysisId}/`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error));
        window.location.reload(true);
    };

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardHeader
                    action={
                        <Grid
                            item
                            container
                            direction="row"
                            alignItems="center"
                        >
                            <Button
                                style={{ color: '#8481B0' }}
                                onClick={onEditHandler}
                            >
                                Edit
                            </Button>
                            <Button
                                style={{ color: '#DC3545' }}
                                onClick={handleClickOpen}
                            >
                                Delete
                            </Button>
                        </Grid>
                    }
                    title={title}
                />
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={title}
                />
                <CardContent>
                    <Typography
                        color="textSecondary"
                        component="p"
                        style={{ fontSize: '0.7em' }}
                    >
                        {date}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="primary"
                        component="p"
                        align="justify"
                    >
                        {props.data.ticker}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        component="p"
                        dangerouslySetInnerHTML={{
                            __html: text.slice(0, 60) + '...',
                        }}
                    />
                </CardContent>
                <CardActions>
                    <IconButton disabled>
                        <Typography>{props.data.upvotes}</Typography>
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton disabled>
                        <Typography>{numOfComments}</Typography>
                        <CommentIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Delete this Analysis'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure? This action is irreversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Exit
                    </Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            handleDelete();
                        }}
                        style={{ color: '#DC3545' }}
                        autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default IndividualAnalysisCard;
