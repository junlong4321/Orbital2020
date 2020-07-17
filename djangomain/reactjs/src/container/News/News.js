import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import DataTitle from '../../components/DataTitle/DataTitle';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import NewsCard from '../../components/NewsCard/NewsCard';
import Button from '@material-ui/core/Button';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import axiosNews from '../../components/axios/axiosNews';

class News extends Component {
    state = {
        newsData: null,
        newsToPull: 5,
        search: '',
        error: null,
    };

    onSearchChange = (event) => {
        this.setState({ search: event.target.value, newsToPull: 5 });
    };

    componentDidMount() {
        axiosNews
            .get('5&apiKey=3d12e390ed3442689f8733c641ba3f66')
            .then((response) => {
                this.setState({ newsData: response.data.articles });
            })
            .catch((error) => {
                this.setState({ error: error });
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.newsToPull !== this.state.newsToPull) {
            const query =
                this.state.search === '' ? '' : `&q=${this.state.search}`;
            axiosNews
                .get(
                    `${this.state.newsToPull}${query}&apiKey=3d12e390ed3442689f8733c641ba3f66`
                )
                .then((response) => {
                    this.setState({ newsData: response.data.articles });
                })
                .catch((error) => {
                    this.setState({ error: error });
                });
        }

        if (prevState.search !== this.state.search) {
            axiosNews
                .get(
                    `${this.state.newsToPull}&q=${this.state.search}&apiKey=3d12e390ed3442689f8733c641ba3f66`
                )
                .then((response) => {
                    this.setState({ newsData: response.data.articles });
                })
                .catch((error) => {
                    this.setState({ error: error });
                });
        }
    }

    loadMoreHandler() {
        this.setState({ newsToPull: this.state.newsToPull + 5 });
    }
    render() {
        let newsCard = null;
        const currentDate = new Date();
        if (this.state.newsData !== null) {
            newsCard = this.state.newsData.map((news) => {
                return (
                    <Grid
                        container
                        item
                        md={12}
                        justify="center"
                        alignContent="center"
                    >
                        <NewsCard data={news} currentDate={currentDate} />
                    </Grid>
                );
            });
        }

        return (
            <React.Fragment>
                <Grid container style={{ marginTop: '20px' }}>
                    <Grid container item md={1} />
                    <Grid
                        container
                        item
                        md={10}
                        justify="center"
                        alignContent="center"
                        style={{ backgroundColor: 'rgba(20, 20, 20, 0.8)' }}
                    >
                        <Grid
                            item
                            container
                            md={12}
                            justify="center"
                            alignContent="center"
                        >
                            <DataTitle
                                icon={
                                    <LibraryBooksIcon
                                        color="primary"
                                        style={{ paddingRight: '10px' }}
                                    />
                                }
                            >
                                News
                            </DataTitle>
                        </Grid>
                        <Grid
                            container
                            item
                            justify="flex-end"
                            style={{ marginRight: '1em' }}
                        >
                            <SearchBar onChange={this.onSearchChange} />
                        </Grid>

                        {newsCard}
                    </Grid>

                    <Grid
                        container
                        item
                        justify="center"
                        style={{ margin: '1em 0em 1em 0em' }}
                    >
                        <Button
                            style={{ backgroundColor: '#292929' }}
                            onClick={() => this.loadMoreHandler()}
                        >
                            Load more
                        </Button>
                    </Grid>
                    <Grid container item md={1} />
                </Grid>
            </React.Fragment>
        );
    }
}

export default News;
