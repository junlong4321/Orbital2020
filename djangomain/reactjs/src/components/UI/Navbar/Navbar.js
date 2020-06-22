import React from 'react';
import { NavLink } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SearchIcon from '@material-ui/icons/Search';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import pic from '../../../assets/the-free-market-logo.png';
import styles from './Navbar.module.css';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60,
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  // MOBILE USER PROFILE MENU
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
        <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        >
        <MenuItem>
            <Avatar></Avatar>
            <p style={{paddingLeft: '0.6em'}}>User123</p>
        </MenuItem>
        <MenuItem>
            <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            >
            <AccountCircle />
            </IconButton>
            <p>Profile</p>
        </MenuItem>
        <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
                <AssignmentIcon />
            </IconButton>
            <p>Your Analysis</p>
        </MenuItem>
        <MenuItem>
            <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            >
            <BookmarkIcon />
            </IconButton>
            <p>Bookmarked</p>
        </MenuItem>
        <MenuItem>
            <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            >
            </IconButton>
            <p style={{color: '#797979'}}>Sign out</p>
        </MenuItem>
        </Menu>
  );

  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const handleUserMenuClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl1(null);
  };

  // understand what this does
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const handleSelectClose = () => {
    setOpen(false);
  };

  const handleSelectOpen = () => {
    setOpen(true);
  };

  return (
    // DESKTOP USER PROFILE
    <div className={classes.grow}>
      <AppBar style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}} position="static">
        <Toolbar>
          <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          >
            <Avatar src={pic}></Avatar>
            <Typography className={classes.title} variant="h6" noWrap>
              The Free Market
            </Typography>
          </Grid>
          {/* Navigation Links */}
          <Grid className={styles.list}
            container
            direction="row"
            justify="flex-start"
            alignItems="center">
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/stocks">Stocks</NavLink>
            </li>
            <li>
              <NavLink to="/news">News</NavLink>
            </li>
          </Grid>
          {/*Select / Search Bar */}
          <Grid 
            container
            direction="row"
            justify="flex-end"
            alignItems="center">
            <div>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleSelectClose}
                  onOpen={handleSelectOpen}
                  onChange={handleSelectChange}
                  defaultValue={10}
                >
                  <MenuItem value={10}>Ticker</MenuItem>
                  <MenuItem value={20}>User</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.search} style={{marginLeft: '0px', paddingLeft: '0px'}}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
            
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Grid>
            {/* User Profile Menu */}
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center">
          <div>
            <Avatar style={{float: 'left'}}></Avatar>
            <Button aria-controls="simple-menu" aria-haspopup="true" style={{color: 'white', paddingLeft: '20px'}} onClick={handleUserMenuClick}>
                User12345
            </Button>
            <Menu 
                id="simple-menu"
                anchorEl={anchorEl1}
                keepMounted
                open={Boolean(anchorEl1)}
                onClose={handleUserMenuClose}
            >
                <MenuItem>
                    <Avatar></Avatar>
                    <p style={{paddingLeft: '0.6em'}}>User123</p>
                </MenuItem>
                <MenuItem>
                    <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    >
                    <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
                <MenuItem>
                    <IconButton aria-label="show 11 new notifications" color="inherit">
                        <AssignmentIcon />
                    </IconButton>
                    <p>Your Analysis</p>
                </MenuItem>
                <MenuItem>
                    <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    >
                    <BookmarkIcon />
                    </IconButton>
                    <p>Bookmarked</p>
                </MenuItem>
                <MenuItem>
                    <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    >
                    </IconButton>
                    <p style={{color: '#797979'}}>Sign out</p>
                </MenuItem>
            </Menu>
            </div>
          </Grid>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}