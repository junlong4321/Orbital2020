import React, { Component } from 'react';
import StockOverview from '../StockOverview/StockOverview';
import Charts from '../Charts/Charts';
import Grid from '@material-ui/core/Grid';

class StockInfo extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !nextProps === this.props;
    }

    render() {
        const company = this.props.match.params.company;
        return (
            <Grid item container md={12} justify="center">
                <Grid container item justify="center">
                    <StockOverview companyName={company} />
                </Grid>
                <Grid
                    container
                    item
                    justify="center"
                    style={{ marginTop: '2em  ' }}
                >
                    <Charts companyName={company} />
                </Grid>
            </Grid>
        );
    }
}

export default StockInfo;
