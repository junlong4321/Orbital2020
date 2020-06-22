import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import BarChartIcon from '@material-ui/icons/BarChart';
import Grid from '@material-ui/core/Grid';

export default function Title(props) {
  return (
    <React.Fragment>
        <Grid container direction="row" justify="center" alignItems="center">
            <BarChartIcon color="primary" style={{paddingRight: '10px'}} />
            <Typography component="h2" variant="h6" color="primary" align="center" gutterBottom>
            {props.children}
            </Typography>
        </Grid>
    </React.Fragment> 
  );
}

Title.propTypes = {
  children: PropTypes.node,
};