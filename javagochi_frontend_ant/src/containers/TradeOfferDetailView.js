import React from 'react';
import axios from 'axios';
import { Typography, Spin } from 'antd';

import TradeDetail from '../components/TradeDetail';
const { Title } = Typography;

class TradeOfferDetail extends React.Component {

    state = {
        trade: {},
        next_level: {}
    }

    componentDidMount() {
        const id = this.props.match.params.tradeId;

        axios.get(`http://localhost:8000/api/trades/${id}`)
        .then((res) => {
            this.setState({
                trade: res.data
            });

            const lvl = this.state.trade.offering.current_level;
            axios.get(`http://localhost:8000/api/javagochi/expmap/${lvl}/`)
            .then(res => {
                this.setState({
                    next_level: res.data
                })
            })
        });
    }

    render() {
        if(this.state.next_level.exp_for_next_level === undefined || this.state.trade.offering === undefined) {
            return (
                <div>
                    <Title>Loading</Title>
                    <Spin />
                </div>
            )
        }
        else {
            return (
                <TradeDetail data={this.state} />
            );
        }
    }
}

export default TradeOfferDetail;
