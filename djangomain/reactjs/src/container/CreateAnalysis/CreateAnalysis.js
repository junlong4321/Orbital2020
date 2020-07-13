import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CreateAnalysisContainer from './CreateAnalysisContainer';

class CreateAnalysis extends Component {
    render() {
        return (
            <React.Fragment>
                <Grid
                    container
                    item
                    direction="row"
                    justify="center"
                    alignContent="center"
                >
                    <Grid container item md={1} />
                    <Grid
                        container
                        item
                        direction="row"
                        justify="center"
                        alignContent="center"
                        style={{
                            background: 'rgba(20, 20, 20, 0.8)',
                            margin: '5em 0em 5em 0em',
                        }}
                        md={10}
                    >
                        <CreateAnalysisContainer />
                    </Grid>
                    <Grid container item md={1} />
                </Grid>
            </React.Fragment>
        );
    }
}

export default CreateAnalysis;
