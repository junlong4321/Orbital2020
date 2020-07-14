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
import { DialogTitle } from '@material-ui/core';
import axios from 'axios';

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
    const token = localStorage.getItem('token');
    useEffect(() => {
        const pullData = {
            Authorization: 'Token ' + { token },
        };
        axios
            .get(
                `http://127.0.0.1:8000/api/comments/?search=${props.data.id}`,
                pullData
            )
            .then((response) => setNumOfComments(response.data.length))
            .catch((error) => console.log(error));
    });
    let title = '';
    let date = '';
    let text = '';
    let companyName = '';
    let image = null;
    // to ensure that initial render of component shows blank, no error thrown. populate with correct data after analysis data is pulled
    if (props.data !== null) {
        title = props.data.title;
        date = moment(props.data.created_date);
        text = props.data.text;
        companyName = props.data.stock;
        if (props.data.images.length !== 0) {
            image = props.data.images[0].image;
        }
    }

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                action={<Button style={{ color: '#8481B0' }}>Edit</Button>}
                title={title}
            />
            <CardMedia className={classes.media} image={image} title={title} />
            <CardContent>
                <Typography
                    color="textSecondary"
                    component="p"
                    style={{ fontSize: '0.7em' }}
                >
                    {date}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    {text.slice(0, 60) + '...'}
                </Typography>
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
    );
};

export default IndividualAnalysisCard;
