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
const IndividualAnalysisCard = () => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardHeader
                action={<Button style={{ color: '#8481B0' }}>Edit</Button>}
                title="Shrimp"
            />
            <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title="Paella dish"
            />
            <CardContent>
                <Typography
                    color="textSecondary"
                    component="p"
                    style={{ fontSize: '0.7em' }}
                >
                    Last updated: 3 weeks ago
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    This impressive paella
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
