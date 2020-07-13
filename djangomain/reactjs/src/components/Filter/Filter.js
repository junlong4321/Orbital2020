import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
}));

const Filter = (props) => {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-helper">Filter by</InputLabel>
            <NativeSelect
                inputProps={{
                    name: 'age',
                    id: 'age-native-helper',
                }}
            >
                <option aria-label="None" value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
            </NativeSelect>
        </FormControl>
    );
};

export default Filter;
