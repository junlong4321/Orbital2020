import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import moment from 'moment';

import Navbar from '../../components/UI/Navbar/Navbar';
import DataTitle from '../../components/DataTitle/DataTitle';
import SummaryTableHead from '../../components/Tables/SummaryTableHead';
import SummaryTableBody from '../../components/Tables/SummaryTableBody';
import AnalysisCard from '../../components/AnalysisCard/AnalysisCard';
import styles from './Home.module.css';
import BarChartIcon from '@material-ui/icons/BarChart';
import WhatshotIcon from '@material-ui/icons/Whatshot';

class Home extends Component {
    state = {
        marketSummaryDataName: ['SPY', 'DBSM.SI'],
        marketSummaryData1: null,
        marketSummaryData2: null,
        analysisSummaryData: null,
        marketSummaryDataError: null,
        analysisSummaryDataError: null,
    };

    componentDidMount() {
        const marketSummaryDataName = this.state.marketSummaryDataName;
        const marketSummaryData = {};
        const marketSummaryDataUrl = this.state.marketSummaryDataName.map(
            (stock) => {
                return `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=NSELWN19JOULLJJ9`;
            }
        );
        let promises = [];
        marketSummaryDataUrl.forEach((url) => {
            promises.push(axios.get(url));
        });
        axios
            .all(promises)
            .then(
                axios.spread((...response) => {
                    const response1 = response[0];
                    const response2 = response[1];
                    this.setState({
                        marketSummaryData1: response1['data']['Global Quote'],
                        marketSummaryData2: response2['data']['Global Quote'],
                    });
                })
            )
            .catch((errors) => console.log(errors));
    }

    render() {
        const marketSummaryData1 = this.state.marketSummaryData1;
        const marketSummaryData2 = this.state.marketSummaryData2;

        const createData = (id, name, price, change, changePercent) => {
            return { id, name, price, change, changePercent };
        };

        let rows = [];

        if (marketSummaryData1 === null || marketSummaryData2 == null) {
            rows = [
                createData(0, 'SPY', 100, -20, -20 + '%'),
                createData(1, 'SPY', 100, -20, -20 + '%'),
            ];
        } else {
            rows = [
                createData(
                    0,
                    marketSummaryData1['01. symbol'],
                    marketSummaryData1['05. price'],
                    marketSummaryData1['09. change'],
                    marketSummaryData1['10. change percent']
                ),
                createData(
                    1,
                    marketSummaryData2['01. symbol'],
                    marketSummaryData2['05. price'],
                    marketSummaryData2['09. change'],
                    marketSummaryData2['10. change percent']
                ),
            ];
        }

        const headings = ['Name', 'Price', 'Change', '% Change'];

        return (
            <React.Fragment>
                <Navbar />
                <Grid container style={{ marginTop: '20px' }}>
                    <Grid container item md={1} />
                    <Grid
                        xs={12}
                        md={6}
                        className={styles.tableBackground}
                        container
                        item
                    >
                        <DataTitle
                            icon={
                                <BarChartIcon
                                    color="primary"
                                    style={{ paddingRight: '10px' }}
                                />
                            }
                        >
                            Market Summary
                        </DataTitle>
                        <Table size="medium">
                            <SummaryTableHead headings={headings} />
                            <SummaryTableBody bodyInfo={rows} />
                        </Table>
                    </Grid>
                    <Grid container item md={4} />
                    <Grid container item md={1} />
                </Grid>
                <Grid container style={{ marginTop: '20px' }}>
                    <Grid container item md={1} />
                    <Grid
                        className={styles.tableBackground}
                        xs={12}
                        md={10}
                        container
                        item
                        direction="row"
                        justify="center"
                        alignContent="center"
                    >
                        <DataTitle
                            icon={
                                <WhatshotIcon
                                    color="primary"
                                    style={{ paddingRight: '10px' }}
                                />
                            }
                        >
                            Featured Posts
                        </DataTitle>
                        <Grid item xs={6} md={4} container justify="center">
                            <AnalysisCard />
                        </Grid>
                        <Grid item xs={6} md={4} container justify="center">
                            <AnalysisCard />
                        </Grid>
                        <Grid item xs={6} md={4} container justify="center">
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
