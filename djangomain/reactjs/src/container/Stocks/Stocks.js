import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import Navbar from '../../components/UI/Navbar/Navbar';
import DataTitle from '../../components/DataTitle/DataTitle';
import AnalysisCard from '../../components/AnalysisCard/AnalysisCard';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import styles from './Stocks.module.css';

class Stocks extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
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
                      <LibraryBooksIcon
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
                  <SearchBar />
                </Grid>
              </Grid>
              <Grid container className={styles.cardSpacing}>
                <Grid
                  item
                  xs={12}
                  md={4}
                  container
                  justify="center"
                  className={styles.individualCardSpacing}
                >
                  <AnalysisCard />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  container
                  justify="center"
                  className={styles.individualCardSpacing}
                >
                  <AnalysisCard />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  container
                  justify="center"
                  className={styles.individualCardSpacing}
                >
                  <AnalysisCard />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item md={1} />
        </Grid>
      </React.Fragment>
    );
  }
}

export default Stocks;
