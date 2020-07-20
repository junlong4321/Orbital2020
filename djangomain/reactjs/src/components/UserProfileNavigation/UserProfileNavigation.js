import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
}));

const UserProfileNavigation = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <List component="nav">
                <NavLink exact activeStyle={{ color: '#fa923f' }} to="/profile">
                    <ListItem button>
                        <ListItemText primary="User Profile" />
                    </ListItem>
                </NavLink>
                <NavLink
                    exact
                    activeStyle={{ color: '#fa923f' }}
                    to="/your-analysis"
                >
                    <ListItem button>
                        <ListItemText primary="Your Analysis" />
                    </ListItem>
                </NavLink>
                <NavLink
                    exact
                    activeStyle={{ color: '#fa923f' }}
                    to="/create-analysis"
                >
                    <ListItem button>
                        <ListItemText primary="Create New Analysis" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText
                            primary="Bookmarked"
                            style={{ color: 'white' }}
                        />
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );
};

export default UserProfileNavigation;
