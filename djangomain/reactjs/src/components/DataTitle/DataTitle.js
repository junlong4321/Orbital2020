import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default function Title(props) {
  return (
    <React.Fragment>
        <Grid container direction="row" justify="center" alignItems="center" style={{padding: '1em 0em 1em 0em'}}>
            {props.icon}
            <Typography component="h2" variant="h6" color="primary" align="center" gutterBottom style={{paddingTop: '10px'}}>
            {props.children}
            </Typography>
        </Grid>
    </React.Fragment> 
  );
}

Title.propTypes = {
  children: PropTypes.node,
};