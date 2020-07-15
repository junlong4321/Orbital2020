import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardActionArea from '@material-ui/core/CardActionArea';
import moment from '../../components/moment/moment';
import AnalysisModal from '../../components/AnalysisModal/AnalysisModal';
import CommentIcon from '@material-ui/icons/Comment';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import axiosDb from '../axios/axiosDb';

// styling of component
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: '100%',
        paddingTop: '60%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

// truncate text longer than 130 words
const truncateLongAnalysis = (text) => {
    let finalText = '';
    if (text.length > 130) {
        finalText = text.slice(0, 130) + '...';
    } else {
        finalText = text;
    }
    return finalText;
};

const AnalysisCard = (props) => {
    const classes = useStyles();

    // change time format
    const timeNow = moment(props.data.created_date);

    // text after truncating
    const finalText = truncateLongAnalysis(props.data.text);

    // dialog handling
    const [open, setOpen] = React.useState(false);

    // handles the opening and closing of the Card Modal
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // toggles the like button state
    const [like, setLike] = React.useState(false);
    const onLikeHandler = () => {
        setLike(!like);
    };

    // calls the number of comments to be displayed
    const [numOfComments, setNumOfComments] = useState(0);
    const [analysisAuthorImage, setAnalysisAuthorImage] = useState(null);
    useEffect(() => {
        axiosDb
            .get(`/api/comments/?search=${props.data.id}`)
            .then((response) => setNumOfComments(response.data.length))
            .catch((error) => console.log(error));

        axiosDb
            .get(`/api/users/?search=${props.data.name}`)
            .then((response) => {
                setAnalysisAuthorImage(response.data[0].profile_picture);
            })
            .catch((error) => console.log(error));
    });

    // gets the first letter of the name
    const name = props.data.name;
    const firstLetter = name.slice(0, 1).toUpperCase();
    const params = like
        ? {
              color: 'error',
          }
        : {};

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Link to={'/user/' + props.data.name}>
                            <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">
                                            {props.data.name}
                                        </Typography>
                                        <b>{'Community Verified'}</b>
                                    </React.Fragment>
                                }
                            >
                                <Avatar
                                    aria-label="recipe"
                                    className={classes.avatar}
                                    src={analysisAuthorImage}
                                />
                            </HtmlTooltip>
                        </Link>
                    }
                    title={props.data.title}
                    subheader={timeNow}
                />
                <CardActionArea onClick={handleClickOpen}>
                    <CardMedia
                        className={classes.media}
                        image={
                            props.data.images[0] == null
                                ? null
                                : props.data.images[0].image
                        }
                    />
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="primary"
                            component="p"
                            align="justify"
                        >
                            {props.data.stock}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            align="justify"
                        >
                            {finalText}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                    <Typography
                        variant="body1"
                        style={{ paddingLeft: '0.5em', fontSize: '0.8em' }}
                    >
                        {props.data.upvotes}
                    </Typography>
                    <IconButton
                        aria-label="add to favorites"
                        style={{ marginLeft: '-0.4em' }}
                        onClick={onLikeHandler}
                    >
                        <FavoriteIcon {...params} />
                    </IconButton>
                    <Typography
                        variant="body1"
                        style={{ paddingLeft: '0.5em', fontSize: '0.8em' }}
                    >
                        {numOfComments}
                    </Typography>
                    <IconButton style={{ marginLeft: '-0.4em' }}>
                        <CommentIcon />
                    </IconButton>
                    <IconButton>
                        <BookmarkIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <AnalysisModal
                open={open}
                onClose={handleClose}
                data={props.data}
            />
        </React.Fragment>
    );
};

export default React.memo(AnalysisCard);
