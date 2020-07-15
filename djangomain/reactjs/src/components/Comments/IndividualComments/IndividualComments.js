import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import moment from '../../moment/moment';
import axiosDb from '../../axios/axiosDb';

const IndividualComments = (props) => {
    const [commentsAuthorImage, setCommentsAuthorImage] = useState(null);
    useEffect(() => {
        axiosDb
            .get(`/api/users/?search=${props.data.commenter_names}`)
            .then((response) => {
                setCommentsAuthorImage(response.data[0].profile_picture);
            })
            .catch((error) => console.log(error));
    });
    // converting to appropriate date time format
    const date = moment(props.data.created_date);
    return (
        <React.Fragment>
            <Card variant="outlined" style={{ margin: '0.5em 0em 0.5em 0em' }}>
                <CardHeader
                    avatar={<Avatar src={commentsAuthorImage} />}
                    title={props.data.commenter_names}
                    subheader={date}
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        align="justify"
                    >
                        {props.data.comment}
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

export default IndividualComments;
