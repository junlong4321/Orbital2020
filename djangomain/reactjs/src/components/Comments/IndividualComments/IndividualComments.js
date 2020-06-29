import React from 'react';
import { Typography } from '@material-ui/core';
import userImage from '../../../assets/login-bg.jpg';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import moment from '../../moment/moment';

const IndividualComments = (props) => {
    // converting to appropriate date time format
    const date = moment(props.data.created_date);
    return (
        <React.Fragment>
            <Card variant="outlined" style={{ margin: '0.5em 0em 0.5em 0em' }}>
                <CardHeader
                    avatar={<Avatar src={userImage} />}
                    title={props.data.commenter}
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
