import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const NavbarSearch = (props) => {
    const useStyles = makeStyles((theme) => ({
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        multilineColor: {
            color: 'white',
        },
    }));

    const classes = useStyles();

    return (
        <Grid
            className={classes.search}
            style={{ marginLeft: '0px', paddingLeft: '0px' }}
        >
            <div className={classes.searchIcon}>
                <SearchIcon color="primary" />
            </div>
            <InputBase
                color="primary"
                name="search"
                placeholder="Search…"
                onChange={props.onChange}
                value={props.search}
                onKeyDown={props.keyPress}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{
                    'aria-label': 'search',
                    className: classes.multilineColor,
                }}
            />
        </Grid>
    );
};

export default NavbarSearch;
