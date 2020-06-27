import React from 'react';
import { Typography } from '@material-ui/core';
import userImage from '../../../assets/login-bg.jpg';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const IndividualComments = (props) => {
    return (
        <React.Fragment>
            <Card variant="outlined" style={{ margin: '0.5em 0em 0.5em 0em' }}>
                <CardHeader
                    avatar={<Avatar src={userImage} />}
                    title="admin123"
                    subheader="Jun 26"
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        align="justify"
                    >
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Vivamus sagittis lacus vel augue laoreet
                        rutrum faucibus dolor auctor.
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

export default IndividualComments;
