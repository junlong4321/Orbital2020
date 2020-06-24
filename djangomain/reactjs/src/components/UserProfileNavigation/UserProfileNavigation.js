import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const UserProfileNavigation = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <List component="nav">
                <ListItem button>
                    <Link to="profile">
                        <ListItemText
                            primary="User Profile"
                            style={{ color: 'white' }}
                        />
                    </Link>
                </ListItem>
                <ListItem button>
                    <Link to="your-analysis">
                        <ListItemText
                            primary="Your Analysis"
                            style={{ color: 'white' }}
                        />
                    </Link>
                </ListItem>
                <ListItem button>
                    <ListItemText
                        primary="Bookmarked"
                        style={{ color: 'white' }}
                    />
                </ListItem>
            </List>
        </div>
    );
};

export default UserProfileNavigation;
