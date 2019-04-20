import React from 'react';
import axios from 'axios';
import { Typography, Spin, Button, Form, Select } from 'antd';
import { withRouter } from 'react-router-dom';

import TradeDetail from '../components/TradeDetail';
const { Title } = Typography;

const Option = Select.Option;

class TradeOfferDetail extends React.Component {

    state = {
        trade: {},
        next_level: {},
        tradeable_jcs: [],
        selected_jc_trade: 0
    }

    handleSelect = (val) => {
        console.log(val);
        this.setState({
            selected_jc_trade: val
        })
    }

    acceptTrade = (e) => {
        e.preventDefault();

        const id = this.state.trade.id;
        console.log(this.state.selected_jc_trade);
        axios.put(`http://localhost:8000/api/trades/${id}/conclude/`, {
            id_trader: this.state.selected_jc_trade
        })
        .then((res) => {
            console.log(res.data);
            this.props.history.push('/myjavagochis');
        })
        .catch((err) => {
            console.log(err);
        });
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
        const user = localStorage.getItem('username');

        const token = localStorage.getItem('token');

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }

        axios.all([
            axios.get(`http://localhost:8000/api/trades/${id}`),
            axios.get(`http://localhost:8000/api/users/${user}/javagochis/`)
        ])
        .then(axios.spread((resTrade, resJc) => {
            const tradeable_jcs = resJc.data.filter(function (jc) { return jc.race.race === resTrade.data.interested_into.race; });
            this.setState({
                trade: resTrade.data,
                tradeable_jcs: tradeable_jcs
            });

            const lvl = this.state.trade.offering.current_level;
            axios.get(`http://localhost:8000/api/javagochi/expmap/${lvl}/`)
            .then(res => {
                this.setState({
                    next_level: res.data
                })
            });
        }));
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
            const tradeable_jcs = this.state.tradeable_jcs;
            const offering = this.state.trade.offering;
            const user = this.state.trade.offering.owner;
            return (
                <div>
                    {
                        user.username === localStorage.getItem('username') ?
                            <Title>{"You are offering " + offering.nickname + " (" + offering.race.race + ")"}</Title>
                        :
                            <Title>{user.username + " offers " + offering.nickname + " (" + offering.race.race + ")"}</Title>
                    }
                    <TradeDetail data={this.state} />
                    {
                        this.state.trade.offering.owner.username === localStorage.getItem('username') ?
                            <div>
                                <Button type="primary" onClick={this.removeTrade}>Remove this trade</Button>
                            </div>
                        :
                            <div style={{ marginTop: 15 }}>
                                <p>Choose a Javagochi to trade</p>
                                <Form onSubmit={this.acceptTrade}>

                                    <Select
                                      showSearch
                                      placeholder="Choose a Javagochi to trade for this one"
                                      defaultActiveFirstOption={false}
                                      showArrow={true}
                                      style={{ width: 300, marginRight: 15 }}
                                      filterOption={true}
                                      onChange={this.handleSelect}
                                      notFoundContent={null}
                                    >
                                        {tradeable_jcs.map(jc => <Option key={jc.id}>{jc.nickname + " (" + jc.race.race + ")"}</Option>)}
                                    </Select>

                                    <Button type="primary" htmlType="submit">Trade</Button>
                                </Form>
                            </div>
                    }
                </div>
            );
        }
    }
}

export default withRouter(TradeOfferDetail);
