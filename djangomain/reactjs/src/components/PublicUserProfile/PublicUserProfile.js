import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import axiosDb from '../axios/axiosDb';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import AnalysisCard from '../AnalysisCard/AnalysisCard';
import placeholder from '../../assets/placeholder.jpg';

const PublicUserProfile = (props) => {
    // get name of individual user through web url
    const name = props.history.location.pathname.split('/')[2];
    const [biography, setBiography] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [upvotes, setUpvotes] = useState(0);
    const [analyses, setAnalyses] = useState(null);

    // pull the data
    useEffect(() => {
        axiosDb
            .get(`/api/users/?search=${name}`)
            .then((response) => {
                const data = response.data[0];
                setBiography(data.biography);
                setLinkedin(data.linkedin);
                setProfilePicture(data.profile_picture);
                setUpvotes(data.total_upvotes);
            })
            .catch((error) => {
                console.log(error);
            });
        axiosDb
            .get(`/api/analyses/?search=${name}`)
            .then((response) => {
                const data = response.data;
                setAnalyses(data);
            })
            .catch((error) => console.log(error));
    }, []);

    let analysisCard = null;
    if (analyses !== null) {
        analysisCard = analyses.map((data) => {
            return (
                <Grid
                    key={data.id}
                    item
                    xs={6}
                    md={4}
                    container
                    justify="center"
                    style={{
                        marginBottom: '3em',
                    }}
                >
                    <AnalysisCard data={data} />
                </Grid>
            );
        });
    }

    return (
        <Grid>
            <Grid
                container
                item
                direction="row"
                alignContent="center"
                alignItems="center"
                justify="flex-start"
            >
                <Grid>
                    <Avatar
                        alt={name}
                        style={{
                            minHeight: '200px',
                            minWidth: '200px',
                            padding: '2em 2em 2em 5.3em',
                        }}
                        src={
                            profilePicture == null
                                ? placeholder
                                : profilePicture
                        }
                        variant="square"
                    ></Avatar>
                </Grid>
                <Grid item direction="column">
                    <Grid style={{ marginTop: '-2em', paddingBottom: '1em' }}>
                        <Typography variant="h2" color="primary">
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item style={{ display: 'flex' }}>
                        <Tooltip title="Number of likes this user has received">
                            <Grid item style={{ display: 'flex' }}>
                                <Typography variant="body1" color="secondary">
                                    {upvotes}
                                </Typography>
                                <FavoriteIcon
                                    color="primary"
                                    style={{ paddingLeft: '0.2em' }}
                                />
                            </Grid>
                        </Tooltip>
                        <Tooltip title="Number of comments this user has received">
                            <Grid
                                item
                                style={{ display: 'flex', paddingLeft: '2em' }}
                            >
                                <Typography variant="body1" color="secondary">
                                    5
                                </Typography>
                                <CommentIcon
                                    color="primary"
                                    style={{ paddingLeft: '0.2em' }}
                                />
                            </Grid>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item>
                <Grid item container md={1} />
                <Grid item container md={10}>
                    <Typography variant="h6" color="primary">
                        Biography:
                    </Typography>
                    <Typography
                        variant="body1"
                        color="secondary"
                        style={{ textAlign: 'justify' }}
                    >
                        {biography}
                    </Typography>
                    <Grid
                        container
                        item
                        direction="column"
                        style={{ marginTop: '2em' }}
                    >
                        <Typography variant="h6" color="primary">
                            Linkedin:
                        </Typography>
                        <Typography variant="body1" color="secondary">
                            {linkedin}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        item
                        direction="column"
                        style={{ marginTop: '2em' }}
                        justify="center"
                    >
                        <Typography
                            variant="h4"
                            color="primary"
                            style={{ textAlign: 'center' }}
                        >
                            {name}'s Analyses
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container md={1} />
                <Grid
                    container
                    item
                    justify="center"
                    style={{ marginTop: '2em' }}
                >
                    {analysisCard}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PublicUserProfile;
