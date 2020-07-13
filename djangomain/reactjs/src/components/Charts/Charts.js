import React from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

const Charts = (props) => (
    <TradingViewWidget
        style={{ marginTop: '2em' }}
        symbol={props.companyName}
        theme={Themes.DARK}
    />
);

export default Charts;
