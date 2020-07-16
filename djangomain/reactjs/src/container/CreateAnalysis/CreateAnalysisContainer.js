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
import CreateAnalysisSearchbar from '../../components/UI/SearchBar/CreateAnalysisSearchbar';
import { Editor } from '@tinymce/tinymce-react';

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

class AnalysisContainer extends Component {
    state = {
        selectedCompany: '',
    };
    sumbitHandler = (event) => {
        event.preventDefault(); // prevent reloading of the page, when form is submitted.
        const image = event.target.image.files[0];
        const title = event.target.title.value;
        const text = window.parent.tinymce.get('textEditor').getContent();
        console.log(text);
        const ticker = this.state.selectedTicker;
        this.props.onCreateAnalysis(
            image,
            title,
            text,
            localStorage.getItem('email'),
            localStorage.getItem('name'),
            ticker
        );
        this.props.enqueueSnackbar('Analysis successfully created', {
            variant: 'success',
        });
    };

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    onSelectCompany = (code, name) => {
        this.setState({ selectedCompany: name, selectedTicker: code });
    };

    // tinyMCE editor
    handleEditorChange = (e) => {
        console.log('Content was updated:', e.target.getContent());
    };

    render() {
        const { classes } = this.props;
        if (this.props.analysisPostSuccess) {
            document.getElementById('createAnalysisForm').reset();
            window.location.reload(false);
        }
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
                        Create New Analysis
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
                                <Typography color="secondary" style={{}}>
                                    Company
                                </Typography>
                                <CreateAnalysisSearchbar
                                    onSelectCompany={this.onSelectCompany}
                                />
                                <Typography
                                    color="primary"
                                    variant="h6"
                                    style={{ paddingTop: '1em' }}
                                >
                                    {this.state.selectedCompany}
                                </Typography>
                            </Grid>
                            <Grid
                                container
                                item
                                md={12}
                                justify="flex-start"
                                style={{ margin: '1em 1em 1em 1em' }}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ margin: '1em 1em 1em 1em' }}
                                    name="image"
                                />
                            </Grid>
                            <Grid item container>
                                <TextField
                                    variant="outlined"
                                    fullWidth={true}
                                    placeholder="Title"
                                    style={{ margin: '1em 1em 1em 1em' }}
                                    name="title"
                                    onKeyPress={this.onKeyPress}
                                />
                            </Grid>
                            <Grid
                                item
                                container
                                justify="center"
                                style={{ marginTop: '1em' }}
                            >
                                <Editor
                                    apiKey="6mbivnl3zchjn9ue5p2if5g9piq4mh69dq8nt59i7o5ejsfb"
                                    id="textEditor"
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        skin: 'oxide-dark',
                                        content_css: 'dark',
                                        width: '96%',
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount',
                                        ],
                                        toolbar:
                                            'undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | help |  ratios',

                                        setup: function (editor) {
                                            /* example, adding a toolbar menu button */
                                            editor.ui.registry.addMenuButton(
                                                'ratios',
                                                {
                                                    text: 'Financial Ratios',
                                                    fetch: function (callback) {
                                                        var items = [
                                                            {
                                                                type:
                                                                    'menuitem',
                                                                text:
                                                                    'Menu item 1',
                                                                onAction: function () {
                                                                    editor.insertContent(
                                                                        '&nbsp;<em>You clicked menu item 1!</em>'
                                                                    );
                                                                },
                                                            },
                                                            {
                                                                type:
                                                                    'nestedmenuitem',
                                                                text:
                                                                    'Menu item 2',
                                                                icon: 'user',
                                                                getSubmenuItems: function () {
                                                                    return [
                                                                        {
                                                                            type:
                                                                                'menuitem',
                                                                            text:
                                                                                'Sub menu item 1',
                                                                            icon:
                                                                                'unlock',
                                                                            onAction: function () {
                                                                                editor.insertContent(
                                                                                    '&nbsp;<em>You clicked Sub menu item 1!</em>'
                                                                                );
                                                                            },
                                                                        },
                                                                        {
                                                                            type:
                                                                                'menuitem',
                                                                            text:
                                                                                'Sub menu item 2',
                                                                            icon:
                                                                                'lock',
                                                                            onAction: function () {
                                                                                editor.insertContent(
                                                                                    '&nbsp;<em>You clicked Sub menu item 2!</em>'
                                                                                );
                                                                            },
                                                                        },
                                                                    ];
                                                                },
                                                            },
                                                        ];
                                                        callback(items);
                                                    },
                                                }
                                            );
                                        },
                                    }}
                                    onChange={this.handleEditorChange}
                                />
                            </Grid>
                            <Grid item container justify="center">
                                <Button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#1B1661',
                                        margin: '1.5em 1em 1.5em 0em',
                                    }}
                                >
                                    Post
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
        onCreateAnalysis: (token, image, title, text, email, name, stockName) =>
            dispatch(
                actions.createAnalysis(
                    token,
                    image,
                    title,
                    text,
                    email,
                    name,
                    stockName
                )
            ),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(withSnackbar(AnalysisContainer)));
