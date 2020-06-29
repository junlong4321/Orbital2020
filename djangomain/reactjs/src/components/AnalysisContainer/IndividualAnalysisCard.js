import React from 'react';
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
                    <Typography>12</Typography>
                    <FavoriteIcon />
                </IconButton>
                <IconButton>
                    <Typography>2</Typography>
                    <CommentIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default IndividualAnalysisCard;
