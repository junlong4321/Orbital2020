import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';

import Navbar from "../../components/UI/Navbar/Navbar";
import DataTitle from '../../components/DataTitle/DataTitle';
import SummaryTableHead from '../../components/Tables/SummaryTableHead';
import SummaryTableBody from '../../components/Tables/SummaryTableBody';
import AnalysisCard from '../../components/AnalysisCard/AnalysisCard';
import styles from './Home.module.css';

class Home extends Component {
    render () {
        function createData(id, name, price, change, percentChange) {
            return { id, name, price, change, percentChange };
        }
          
        const rows = [
            createData(0, 'STI', 2900.87, -90.36, -3.44 + '%'),
            createData(1, 'S&P 500', 3221.11, -21.01, -0.51% + '%'),
            createData(2, 'DJI', 26485.00, -200,21, -1.52 + '%'),
            createData(3, 'NSXUSD', 9976.51, -112.21, 1.12 + '%'),
            createData(4, 'USDSGD', 1.3974, 0.00336, 0.24 + '%'),
        ];

        const headings = [ 'Name', 'Price', 'Change', '% Change' ];

        return (
            <React.Fragment>
                <Navbar />
                <Grid container style={{marginTop: '20px'}}>
                    <Grid container item md={1} />
                    <Grid xs={12} md={6} className={styles.tableBackground} container item>
                        <DataTitle>Market Summary</DataTitle>
                        <Table size="medium">
                            <SummaryTableHead headings={headings} />
                            <SummaryTableBody bodyInfo={rows} />
                        </Table>
                    </Grid>
                    <Grid container item md={4} />
                    <Grid container item md={1} />
                </Grid>
                <Grid container style={{marginTop: '20px'}}>
                <Grid container item md={1} />
                <Grid className={styles.tableBackground} xs={12} md={10} container item direction="row" justify="center" alignContent="center">
                    <DataTitle>Featured Posts</DataTitle>
                    <Grid item xs={6} md={4} container justify="center" >
                        <AnalysisCard />
                    </Grid>
                    <Grid item xs={6} md={4} container justify="center" >
                        <AnalysisCard />
                    </Grid>
                    <Grid item xs={6} md={4} container justify="center" >
                        <AnalysisCard />
                    </Grid>
                </Grid>
                <Grid container item md={1} />
                </Grid>
            </React.Fragment>
        );
    }
}

export default Home;