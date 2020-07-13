import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActionArea from '@material-ui/core/CardActionArea';
import moment from '../../components/moment/moment';
import AnalysisModal from '../../components/AnalysisModal/AnalysisModal';

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

    // gets the first letter of the name
    const name = props.data.name;
    const firstLetter = name.slice(0, 1).toUpperCase();

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {firstLetter}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
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
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton>
                        <ExpandMoreIcon />
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
