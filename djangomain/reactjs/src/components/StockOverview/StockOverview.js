import React from 'react';

export default class StockOverview extends React.PureComponent {
    constructor(props) {
        super(props);
        this._ref = React.createRef();
    }
    render() {
        return (
            <div
                class="tradingview-widget-container"
                ref={this._ref}
                style={{ marginTop: '2em' }}
            >
                <div class="tradingview-widget-container__widget"></div>
            </div>
        );
    }
    componentDidMount() {
        const script = document.createElement('script');
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            symbol: this.props.companyName,
            width: 1000,
            locale: 'en',
            colorTheme: 'dark',
            isTransparent: false,
        });
        this._ref.current.appendChild(script);
    }
}
