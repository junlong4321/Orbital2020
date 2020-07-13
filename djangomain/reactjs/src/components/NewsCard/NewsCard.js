import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import newsPlaceholderImage from '../../assets/news-placeholder.jpg';

const useStyles = makeStyles({
    root: {},
    media: {
        height: 140,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
});

const MediaCard = (props) => {
    const classes = useStyles();
    const newsDate = moment(props.data.publishedAt);
    const currentDate = moment(props.currentDate);
    const durationDifference = moment.duration(currentDate.diff(newsDate));
    const hoursDifference = Math.ceil(durationDifference.asHours());

    return (
        <Card
            className={classes.root}
            style={{ margin: '1em 2em 1em 2em', flex: ' 100%' }}
        >
            <a href={props.data.url} target="_blank" rel="noopener noreferrer">
                <CardActionArea>
                    <img
                        src={
                            props.data.urlToImage === null
                                ? newsPlaceholderImage
                                : props.data.urlToImage
                        }
                        alt="Blank"
                        style={{ float: 'left', height: '200px' }}
                    />
                    <div className={classes.details}>
                        <CardContent style={{ float: 'right ' }}>
                            <Grid container item direction="column">
                                <Grid container item>
                                    <Typography variant="h6">
                                        {props.data.title}
                                    </Typography>
                                </Grid>
                                <Grid container item style={{ flexGrow: 1 }}>
                                    <Typography
                                        variant="body1"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {props.data.description}
                                    </Typography>
                                </Grid>
                                <Grid container item>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        style={{
                                            position: 'absolute',
                                            marginBottom: '0.5em',
                                            bottom: 0,
                                        }}
                                    >
                                        {hoursDifference === 1
                                            ? hoursDifference + 'hour ago'
                                            : hoursDifference + ' hours ago'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </div>
                </CardActionArea>
            </a>
        </Card>
    );
};

export default MediaCard;
