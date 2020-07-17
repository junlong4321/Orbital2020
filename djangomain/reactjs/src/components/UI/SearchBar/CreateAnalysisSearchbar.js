import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axiosDb from '../../axios/axiosDb';

export default function CreateAnalysisSearchbar(props) {
    const [value, setValue] = React.useState(null);

    // axios request to pull stock ticker symbols every time a change happens in the bar
    const [tickerError, setTickerError] = React.useState(null);
    const [tickers, setTickers] = React.useState([]);
    let companies = [];
    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };
    const onSearchChangeHandler = (event) => {
        const stockSearch = event.target.value;
        if (stockSearch !== '') {
            axiosDb
                .get(`/api/counters/?search=${stockSearch}&limit=5`)
                .then((response) => {
                    setTickers(response.data.results);
                })
                .catch((error) => {
                    setTickerError(error);
                });
        }
        companies = [];
    };

    if (tickers.length !== 0) {
        companies = tickers;
    }

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    props.onSelectCompany(newValue, null);
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    props.onSelectCompany(newValue.inputValue, null);
                } else {
                    props.onSelectCompany(newValue.code, newValue.name);
                }
            }}
            onInputChange={(value) => {
                onSearchChangeHandler(value);
            }}
            onClose={() => {
                setValue(null);
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
                } else {
                    return option.name;
                }
            }}
            renderOption={(option) => {
                return [
                    <strong>{option.code}&nbsp;&nbsp;&nbsp;</strong>,
                    <span>{option.name}</span>,
                ];
            }}
            style={{ width: 200 }}
            size="small"
            freeSolo
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    onKeyPress={onKeyPress}
                />
            )}
        />
    );
}
