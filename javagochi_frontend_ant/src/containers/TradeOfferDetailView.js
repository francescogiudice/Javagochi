import React from 'react';
import axios from 'axios';

import TradeDetail from '../components/TradeDetail';

class TradeOfferDetail extends React.Component {

    state = {
        trade: {}
    }

    componentDidMount() {
        const id = this.props.match.params.tradeId;

        axios.get(`http://localhost:8000/api/trades/${id}`)
        .then((res) => {
            console.log(res.data);
            this.setState({
                trade: res.data
            });
        });
    }

    render() {
        return (
            <TradeDetail data={this.state} />
        );
    }
}

export default TradeOfferDetail;
