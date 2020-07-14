import React from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
    createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import axios from 'axios';

const filter = createFilterOptions();

export default function FreeSoloCreateOption(props) {
    const history = useHistory();
    const [value, setValue] = React.useState(null);
    const onSearchHandler = (company) => {
        if (company != null) {
            history.push(`/stocks/${company}`);
        }
    };

    const onSearchChangeHandler = (value) => {};

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    console.log('1st option: ' + newValue);
                    setValue({
                        title: newValue,
                    });
                    onSearchHandler(newValue);
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    console.log('2nd option: ' + newValue.inputValue);
                    setValue({
                        title: newValue.inputValue,
                    });
                    onSearchHandler(newValue.inputValue);
                } else {
                    console.log(newValue.title);
                    setValue(newValue.title);
                    onSearchHandler(newValue.title);
                }
            }}
            onInputChange={(value) => {
                onSearchChangeHandler(value);
            }}
            onClose={() => {
                setValue(null);
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        title: `Add "${params.inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={companies}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.title;
            }}
            renderOption={(option) => option.title}
            style={{ width: 200 }}
            size="small"
            freeSolo
            renderInput={(params) => (
                <TextField {...params} variant="outlined" />
            )}
        />
    );
}

const companies = [
    { title: 'GOOGL' },
    { title: 'AAPL' },
    { title: 'TSLA' },
    { title: 'NFLX' },
    { title: 'MSFT' },
    { title: 'SBUX' },
    { title: 'AMD' },
    { title: 'NVAX' },
    { title: 'MCD' },
    { title: 'BRK.A' },
];
