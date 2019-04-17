import React from 'react';
import axios from 'axios';
import { Typography, Spin, Button } from 'antd';
import { withRouter } from 'react-router-dom';

import TradeDetail from '../components/TradeDetail';
const { Title } = Typography;

class TradeOfferDetail extends React.Component {

    state = {
        trade: {},
        next_level: {}
    }

    acceptTrade() {
        console.log("Trade accepted");
    }

    removeTrade = () => {
        const id = this.state.trade.id;
        axios.delete(`http://localhost:8000/api/trades/${id}/close`)
        .then((res) => {
            console.log(res);
            this.props.history.push('/mytrades');
        })
        .catch((err) => {
            console.log(err);
        })
        console.log("Removing trade");
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
                <div>
                    <TradeDetail data={this.state} />
                    {
                        this.state.trade.offering.owner.username === localStorage.getItem('username') ?
                            <div>
                                <Button type="primary" onClick={this.removeTrade}>Remove this trade</Button>
                            </div>
                        :
                            <div>
                                <Button type="primary" onClick={this.acceptTrade}>Accept this trade</Button>
                            </div>
                    }
                </div>
            );
        }
    }
}

export default withRouter(TradeOfferDetail);
