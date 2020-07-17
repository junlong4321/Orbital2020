import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import UserProfileNavigation from '../../components/UserProfileNavigation/UserProfileNavigation';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as actions from '../../store/Actions/CreateAnalysis';
import { withSnackbar } from 'notistack';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import axiosDb from '../../components/axios/axiosDb';
import { withRouter } from 'react-router-dom';

const styles = (theme) => ({
    containerBackground: {
        backgroundColor: '#191919',
        borderRadius: '15px',
        marginBottom: '5em',
    },
    typographyContainer: {
        margin: '1em 0em 1em 0em',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
});

class EditAnalysisContainer extends Component {
    state = {
        selectedCompany: '',
        financialRatios: null,
        financialRatiosError: null,
        analysisData: null,
    };
    sumbitHandler = (event) => {
        event.preventDefault(); // prevent reloading of the page, when form is submitted.
        const analysisId = this.props.history.location.pathname.split('/')[2];
        const image = event.target.image.files[0];
        const title = event.target.title.value;
        const text = window.parent.tinymce.get('textEditor').getContent();
        this.props.onEditAnalysis(
            image,
            title,
            text,
            localStorage.getItem('email'),
            localStorage.getItem('name'),
            analysisId
        );
        this.props.enqueueSnackbar('Analysis successfully edited', {
            variant: 'success',
        });
    };

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    componentDidMount() {
        const analysisId = this.props.history.location.pathname.split('/')[2];
        axiosDb
            .get(`/api/analyses/${analysisId}`)
            .then((response) => {
                const code = response.data.ticker;
                this.setState({ analysisData: response.data });
                axios
                    .get(
                        `https://finnhub.io/api/v1/stock/metric?symbol=${code}&metric=all&token=bs7uthfrh5r8i6g98tn0`
                    )
                    .then((response) => {
                        this.setState({
                            financialRatios: response.data.metric,
                        });
                    })
                    .catch((error) => {
                        this.setState({ financialRatiosError: error });
                    });
            })
            .catch((error) => console.log(error));
    }

    render() {
        const { classes } = this.props;
        if (this.props.analysisPostSuccess) {
            document.getElementById('createAnalysisForm').reset();
            window.location.reload(false);
        }

        // financial ratios
        const textEditor = (
            <Editor
                initialValue={
                    this.state.analysisData == null
                        ? null
                        : this.state.analysisData.text
                }
                apiKey="6mbivnl3zchjn9ue5p2if5g9piq4mh69dq8nt59i7o5ejsfb"
                id="textEditor"
                init={{
                    height: 500,
                    menubar: false,
                    skin: 'oxide-dark',
                    content_css: 'dark',
                    width: '96%',
                    readonly: 1,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | ratios',

                    setup: (editor) => {
                        /* example, adding a toolbar menu button */
                        editor.ui.registry.addMenuButton('ratios', {
                            text: 'Financial Ratios',
                            fetch: (callback) => {
                                var items = [
                                    {
                                        type: 'nestedmenuitem',
                                        text: 'Ratios (TTM)',
                                        getSubmenuItems: () => {
                                            return [
                                                {
                                                    type: 'menuitem',
                                                    text: 'Asset Turnover',
                                                    onAction: () => {
                                                        editor.insertContent(
                                                            this.state
                                                                .financialRatios
                                                                .assetTurnoverTTM !==
                                                                null
                                                                ? '&nbsp;<em>' +
                                                                      'Asset Turnover (TTM): ' +
                                                                      this.state.financialRatios.assetTurnoverTTM.toString() +
                                                                      '<em>'
                                                                : '&nbsp;<em>Unavailable<em>'
                                                        );
                                                    },
                                                },
                                                {
                                                    type: 'menuitem',
                                                    text:
                                                        'Book Value per Share',
                                                    onAction: () => {
                                                        editor.insertContent(
                                                            this.state
                                                                .financialRatios
                                                                .bookValuePerShareAnnual !==
                                                                null
                                                                ? '&nbsp;<em>' +
                                                                      'Book Value Per Share (Annual): ' +
                                                                      this.state.financialRatios.bookValuePerShareAnnual.toString() +
                                                                      '<em>'
                                                                : '&nbsp;<em>Unavailable<em>'
                                                        );
                                                    },
                                                },
                                                {
                                                    type: 'menuitem',
                                                    text: 'Cash Flow per Share',
                                                    onAction: () => {
                                                        editor.insertContent(
                                                            this.state
                                                                .financialRatios
                                                                .cashFlowPerShareTTM !==
                                                                null
                                                                ? '&nbsp;<em>' +
                                                                      'Cash Flow per Share (TTM): ' +
                                                                      this.state.financialRatios.cashFlowPerShareTTM.toString() +
                                                                      '<em>'
                                                                : '&nbsp;<em>Unavailable<em>'
                                                        );
                                                    },
                                                },
                                                {
                                                    type: 'menuitem',
                                                    text:
                                                        'Current Dividend Yield',
                                                    onAction: () => {
                                                        editor.insertContent(
                                                            this.state
                                                                .financialRatios
                                                                .currentDividendYieldTTM !==
                                                                null
                                                                ? '&nbsp;<em>' +
                                                                      'Current Dividend Yield (TTM): ' +
                                                                      this.state.financialRatios.currentDividendYieldTTM.toString() +
                                                                      '<em>'
                                                                : '&nbsp;<em>Unavailable<em>'
                                                        );
                                                    },
                                                },
                                                {
                                                    type: 'menuitem',
                                                    text: 'Free Cash Flow',
                                                    onAction: () => {
                                                        editor.insertContent(
                                                            this.state
                                                                .financialRatios
                                                                .freeCashFlowTTM !==
                                                                null
                                                                ? '&nbsp;<em>' +
                                                                      'Free Cash Flow (TTM): ' +
                                                                      this.state.financialRatios.freeCashFlowTTM.toString() +
                                                                      '<em>'
                                                                : '&nbsp;<em>Unavailable<em>'
                                                        );
                                                    },
                                                },
                                                {
                                                    type: 'menuitem',
                                                    text: 'Dividends per Share',
                                                    onAction: () => {
                                                        editor.insertContent(
                                                            this.state
                                                                .financialRatios
                                                                .dividendsPerShareTTM !==
                                                                null
                                                                ? '&nbsp;<em>' +
                                                                      'Dividends per Share (TTM): ' +
                                                                      this.state.financialRatios.dividendsPerShareTTM.toString() +
                                                                      '<em>'
                                                                : '&nbsp;<em>Unavailable<em>'
                                                        );
                                                    },
                                                },
                                                {
                                                    type: 'menuitem',
                                                    text: 'Inventory Turnover',
                                                    onAction: () => {
                                                        editor.insertContent(
                                                            this.state
                                                                .financialRatios
                                                                .inventoryTurnoverTTM !==
                                                                null
                                                                ? '&nbsp;<em>' +
                                                                      'Inventory Turnover (TTM): ' +
                                                                      this.state.financialRatios.inventoryTurnoverTTM.toString() +
                                                                      '<em>'
                                                                : '&nbsp;<em>Unavailable<em>'
                                                        );
                                                    },
                                                },
                                                {
                                                    type: 'menuitem',
                                                    text: 'Return on Equity',
                                                    onAction: () => {
                                                        editor.insertContent(
                                                            this.state
                                                                .financialRatios
                                                                .roeTTM !== null
                                                                ? '&nbsp;<em>' +
                                                                      'Return on Equity (TTM): ' +
                                                                      this.state.financialRatios.roeTTM.toString() +
                                                                      '<em>'
                                                                : '&nbsp;<em>Unavailable<em>'
                                                        );
                                                    },
                                                },
                                                {
                                                    type: 'menuitem',
                                                    text:
                                                        'Return on Investment',
                                                    onAction: () => {
                                                        editor.insertContent(
                                                            this.state
                                                                .financialRatios
                                                                .roiTTM !== null
                                                                ? '&nbsp;<em>' +
                                                                      'Return on Investment (TTM): ' +
                                                                      this.state.financialRatios.roiTTM.toString() +
                                                                      '<em>'
                                                                : '&nbsp;<em>Unavailable<em>'
                                                        );
                                                    },
                                                },
                                                {
                                                    type: 'menuitem',
                                                    text: 'Revenue per Share',
                                                    onAction: () => {
                                                        editor.insertContent(
                                                            this.state
                                                                .financialRatios
                                                                .revenuePerShareTTM !==
                                                                null
                                                                ? '&nbsp;<em>' +
                                                                      'Revenue per Share (TTM): ' +
                                                                      this.state.financialRatios.revenuePerShareTTM.toString() +
                                                                      '<em>'
                                                                : '&nbsp;<em>Unavailable<em>'
                                                        );
                                                    },
                                                },
                                            ];
                                        },
                                    },
                                    {
                                        type: 'nestedmenuitem',
                                        text: 'Other Ratios',
                                        getSubmenuItems: () => {
                                            return [
                                                {
                                                    type: 'menuitem',
                                                    text:
                                                        'Dividend Growth Rate (5Y)',
                                                    onAction: () => {
                                                        editor.insertContent(
                                                            this.state
                                                                .financialRatios
                                                                .dividendGrowthRate5Y !==
                                                                null
                                                                ? '&nbsp;<em>' +
                                                                      'Dividend Growth Rate (5Y): ' +
                                                                      this.state.financialRatios.dividendGrowthRate5Y.toString() +
                                                                      '<em>'
                                                                : '&nbsp;<em>Unavailable<em>'
                                                        );
                                                    },
                                                },
                                                {
                                                    type: 'menuitem',
                                                    text: 'EPS Growth (5Y)',
                                                    onAction: () => {
                                                        editor.insertContent(
                                                            this.state
                                                                .financialRatios
                                                                .epsGrowth5Y !==
                                                                null
                                                                ? '&nbsp;<em>' +
                                                                      'EPS Growth (5Y): ' +
                                                                      this.state.financialRatios.epsGrowth5Y.toString() +
                                                                      '<em>'
                                                                : '&nbsp;<em>Unavailable<em>'
                                                        );
                                                    },
                                                },
                                                {
                                                    type: 'menuitem',
                                                    text: 'Net Debt (Annual)',
                                                    onAction: () => {
                                                        editor.insertContent(
                                                            this.state
                                                                .financialRatios
                                                                .netDebtAnnual !==
                                                                null
                                                                ? '&nbsp;<em>' +
                                                                      'Net Debt (Annual): ' +
                                                                      this.state.financialRatios.netDebtAnnual.toString() +
                                                                      '<em>'
                                                                : '&nbsp;<em>Unavailable<em>'
                                                        );
                                                    },
                                                },
                                                {
                                                    type: 'menuitem',
                                                    text: 'Market Cap',
                                                    onAction: () => {
                                                        editor.insertContent(
                                                            this.state
                                                                .financialRatios
                                                                .marketCapitalization !==
                                                                null
                                                                ? '&nbsp;<em>' +
                                                                      'Market Capitalization: ' +
                                                                      this.state.financialRatios.marketCapitalization.toString() +
                                                                      ' million' +
                                                                      '<em>'
                                                                : '&nbsp;<em>Unavailable<em>'
                                                        );
                                                    },
                                                },
                                            ];
                                        },
                                    },
                                ];
                                callback(items);
                            },
                        });
                    },
                }}
                onChange={this.handleEditorChange}
            />
        );

        return (
            <React.Fragment>
                <Grid
                    container
                    item
                    md={12}
                    justify="center"
                    className={classes.typographyContainer}
                >
                    <Typography variant="h3" color="primary" align="center">
                        Edit Analysis
                    </Typography>
                </Grid>
                <Grid container item md={1} />
                <Grid item md={2} container>
                    <UserProfileNavigation />
                </Grid>
                <Grid
                    item
                    md={8}
                    container
                    direction="row"
                    alignContent="center"
                    className={classes.containerBackground}
                >
                    <form
                        onSubmit={this.sumbitHandler}
                        className={classes.form}
                        id="createAnalysisForm"
                    >
                        <Grid container justify="center">
                            <Grid
                                container
                                item
                                md={12}
                                style={{ margin: '1em 1em 1em 1em' }}
                                direction="column"
                                alignItems="flex-start"
                            >
                                <Typography color="secondary">
                                    Company
                                </Typography>
                                <Typography
                                    color="primary"
                                    variant="h6"
                                    style={{ paddingTop: '1em' }}
                                >
                                    {this.state.analysisData == null
                                        ? null
                                        : this.state.analysisData.ticker}
                                </Typography>
                            </Grid>
                            <Grid
                                container
                                item
                                md={12}
                                direction="column"
                                justify="flex-start"
                                style={{ margin: '0em 1em 1em 1em' }}
                            >
                                <Typography color="secondary">
                                    Cover Image
                                </Typography>
                                {/* input with current image field */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ marginTop: '0.4em' }}
                                    name="image"
                                />
                                <img
                                    alt="empty"
                                    src={
                                        this.state.analysisData == null
                                            ? null
                                            : this.state.analysisData
                                                  .cover_image
                                    }
                                    style={{ width: '50%' }}
                                />
                            </Grid>
                            <Grid item container>
                                {/* populate with current title */}
                                <TextField
                                    key={`${Math.floor(
                                        Math.random() * 1000
                                    )}-min`}
                                    variant="outlined"
                                    fullWidth={true}
                                    placeholder="Title"
                                    style={{ margin: '1em 1em 1em 1em' }}
                                    name="title"
                                    defaultValue={
                                        this.state.analysisData == null
                                            ? null
                                            : this.state.analysisData.title
                                    }
                                    onKeyPress={this.onKeyPress}
                                />
                            </Grid>
                            <Grid
                                item
                                container
                                justify="center"
                                style={{ marginTop: '1em' }}
                            >
                                {/* poulate text editor with current text */}
                                {textEditor}
                            </Grid>
                            <Grid item container justify="center">
                                <Button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#1B1661',
                                        margin: '1.5em 1em 1.5em 0em',
                                    }}
                                >
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid container item md={1} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        analysisError: state.createAnalysis.error,
        analysisPostSuccess: state.createAnalysis.success,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEditAnalysis: (token, image, title, text, email, name, analysisId) =>
            dispatch(
                actions.editAnalysis(
                    token,
                    image,
                    title,
                    text,
                    email,
                    name,
                    analysisId
                )
            ),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(withRouter(withSnackbar(EditAnalysisContainer))));
