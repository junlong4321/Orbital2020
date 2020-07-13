import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import FindInPage from '@material-ui/icons/FindInPage';
import { connect } from 'react-redux';
import DataTitle from '../../components/DataTitle/DataTitle';
import AnalysisCard from '../../components/AnalysisCard/AnalysisCard';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import styles from './Stocks.module.css';
import StockInfo from '../../components/StockInfo/StockInfo';
import { Route, withRouter } from 'react-router-dom';
import * as actions from '../../store/Actions/Analysis';

class Stocks extends Component {
    state = {
        search: '',
        company: '',
    };

    onSearchChange = (event) => {
        this.setState({ search: event.target.value });
    };

    componentDidMount() {
        const company = this.props.history.location.pathname.split('/')[2];
        this.setState({ company: company });
        if (company == undefined) {
            this.props.onPullAnalysis(this.props.token);
        } else {
            this.props.onPullSpecificAnalysis(this.props.token, company);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const company = this.props.history.location.pathname.split('/')[2];
        console.log(prevState.company);
        if (prevState.company !== company) {
            this.props.onPullSpecificAnalysis(this.props.token, company);
            this.setState({ company: company });
        }
    }

    render() {
        console.log(this.props.analysisData);
        let analysisCard = null;
        const { search } = this.state;
        if (this.props.analysisData !== null) {
            const filteredAnalysis = this.props.analysisData.filter((data) => {
                return (
                    data.stock.toLowerCase().indexOf(search.toLowerCase()) !==
                    -1
                );
            });
            analysisCard = filteredAnalysis.map((data) => {
                return (
                    <Grid
                        key={data.id}
                        item
                        xs={6}
                        md={4}
                        container
                        justify="center"
                        style={{ marginBottom: '3em' }}
                    >
                        <AnalysisCard data={data} />
                    </Grid>
                );
            });
        }
        return (
            <React.Fragment>
                <Route
                    exact
                    path="/stocks/:company"
                    component={withRouter(StockInfo)}
                />
                <Grid container style={{ marginTop: '3em' }}>
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
                        <Grid container>
                            <Grid container>
                                <Grid item xs={0} md={2} />
                                <Grid item xs={6} md={8}>
                                    <DataTitle
                                        icon={
                                            <FindInPage
                                                color="primary"
                                                style={{ paddingRight: '10px' }}
                                            />
                                        }
                                    >
                                        Stock Analysis
                                    </DataTitle>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={2}
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    className={styles.searchBar}
                                >
                                    <SearchBar onChange={this.onSearchChange} />
                                </Grid>
                            </Grid>
                            <Grid container className={styles.cardSpacing}>
                                {analysisCard}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item md={1} />
                </Grid>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        token: state.auth.token,
        analysisData: state.analysis.analysisData,
        analysisDataLoading: state.analysis.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPullSpecificAnalysis: (token, company) =>
            dispatch(actions.specificAnalysisData(token, company)),
        onPullAnalysis: (token) => dispatch(actions.analysisData(token)),
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Stocks);
