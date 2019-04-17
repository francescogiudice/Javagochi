import React from 'react';
import axios from 'axios';
import { Typography, List, Avatar, Form, Button, Select, Modal } from 'antd';
import { withRouter } from 'react-router-dom';

import JavagochiOwned from '../components/JavagochiOwned';
import Loading from '../components/Loading';

import '../styles/JcOwnedDetail.css';

const { Text } = Typography;
const Option = Select.Option;

class JavagochiOwnedDetail extends React.Component {

    state = {
        javagochi: {},
        items: [],
        next_level: {},
        all_javagochis: [],
        owned_javagochis: [],
        is_traded: false,
        selected_race_trade: "",
        challenger_javagochi: 0,
        popupVisible: false,
        message: ""
    }

    showModal = (e) => {
        this.setState({
            popupVisible: true
        });
    }

    handleOk = (e) => {
        this.setState({
            popupVisible: false,
            is_traded: true
        });
        this.props.history.push('/mytrades');
    }

    handleChange = (val) => {
        this.setState({
            selected_race_trade: val
        })
    }

    handleSelect = (val) => {
        console.log(val);
        this.setState({
            challenger_javagochi: val
        })
    }

    handleTradeStart = (e) => {
        e.preventDefault();
        console.log("Initiating trade. Trading " + this.state.javagochi.nickname + " for a " + this.state.selected_race_trade);

        axios.post("http://localhost:8000/api/trades/add/", {
          offered_id: this.state.javagochi.id,
          interested_into: this.state.selected_race_trade,
        })
        .then((res) => {
            this.setState({
                message: res.data
            });
            this.showModal();
        })
        .catch((err) => {
            console.log(err.response);
            if(err.response.data !== undefined) {
                this.setState({
                    message: err.response.data
                });
                this.showModal();
            }
        });
    }

    handleChallenge = (e) => {
        e.preventDefault();

        const id_challenged = this.state.javagochi.id;
        axios.put(`http://localhost:8000/api/javagochi/${id_challenged}/challenge/`, {
            id_challenger: this.state.challenger_javagochi
        })
        .then((res) => {
            this.reloadJavagochi();
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const user = localStorage.getItem('username');

        axios.all([
            axios.get(`http://localhost:8000/api/javagochi/owned/${id}/`),
            axios.get(`http://localhost:8000/api/users/${user}/items/`),
            axios.get(`http://localhost:8000/api/users/${user}/javagochis/`),
            axios.get(`http://localhost:8000/api/users/${user}/trades/`),
            axios.get('http://localhost:8000/api/javagochi/market/')

        ])
        .then(axios.spread((jcRes, itemRes, ownedjcRes, tradeRes, allRes) => {
            const all_javagochi_races = allRes.data.map(jc => jc.race);
            const is_traded = tradeRes.data.filter(function (trade) { return trade.offering.id === id; }).length > 0;


            this.setState({
                javagochi: jcRes.data,
                items: itemRes.data,
                is_traded: is_traded,
                all_javagochis: all_javagochi_races,
                owned_javagochis: ownedjcRes.data
            });

            const lvl = this.state.javagochi.current_level;
            axios.get(`http://localhost:8000/api/javagochi/expmap/${lvl}/`)
            .then(res => {
                this.setState({
                    next_level: res.data
                })
            })
        }));
    }

    reloadJavagochi() {
        const id = this.props.match.params.id;

        axios.get(`http://localhost:8000/api/javagochi/owned/${id}/`)
        .then(res => {
            this.setState({
                javagochi: res.data
            });

            const lvl = this.state.javagochi.current_level;
            axios.get(`http://localhost:8000/api/javagochi/expmap/${lvl}/`)
            .then(res => {
                this.setState({
                    next_level: res.data
                })
            })
        });
    }

    render() {
        const javagochi = this.state.javagochi;
        const items = this.state.items;
        const next_level = this.state.next_level;
        const all_races = this.state.all_javagochis;
        const owned_javagochis = this.state.owned_javagochis;

        if(javagochi.nickname !== undefined) {
            return (
                <div>
                    <Modal
                      title="The page says:"
                      visible={this.state.popupVisible}
                      onOk={this.handleOk}
                    >
                        <Text>{this.state.message}</Text>
                    </Modal>

                    <JavagochiOwned jc={javagochi} exp={next_level}/>

                    {
                        javagochi.owner.username === localStorage.getItem('username') ?
                            <div>
                                <List
                                  itemLayout="horizontal"
                                  bordered="true"
                                  style={{ widt: 300 }}
                                  dataSource={items}
                                  renderItem={item => (
                                        <div className="hoverme">
                                            <List.Item onClick={(e) => {
                                                e.preventDefault();
                                                const id = javagochi.id;
                                                axios.put(`http://localhost:8000/api/javagochi/owned/${id}/useitem/`, {
                                                    item: item.item.name,
                                                    user: item.owner.username
                                                })
                                                .then((res) => {
                                                    this.reloadJavagochi();
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                });
                                            }}>
                                                <List.Item.Meta
                                                  style={{ widt: 300 }}
                                                  avatar={<Avatar src={item.item.image} />}
                                                  title={item.item.name + "(" + item.amount_owned + ")"}
                                                  description={item.item.property_modified + ": " + item.item.amount_modified}
                                                />
                                            </List.Item>
                                        </div>
                                  )}
                                />

                                {
                                    !this.state.is_traded ?
                                        <div style={{ marginTop: 15 }}>
                                            <p>Choose a Javagochi to trade for this</p>
                                            <Form onSubmit={this.handleTradeStart}>

                                                <Select
                                                  showSearch
                                                  placeholder="Choose a Javagochi to trade this"
                                                  defaultActiveFirstOption={false}
                                                  showArrow={true}
                                                  style={{ width: 300, marginRight: 15 }}
                                                  filterOption={true}
                                                  onChange={this.handleChange}
                                                  notFoundContent={null}
                                                >
                                                    {all_races.map(race => <Option key={race}>{race}</Option>)}
                                                </Select>

                                                <Button type="primary" htmlType="submit">Trade!</Button>
                                            </Form>
                                        </div>
                                    :
                                        <div></div>
                                }
                            </div>
                        :
                            owned_javagochis[0] !== undefined ?
                            <div style={{ marginTop: 15 }}>
                                <p>Choose a Javagochi to battle this one</p>
                                <Form onSubmit={this.handleChallenge}>

                                    <Select
                                      showSearch
                                      placeholder="Choose a Javagochi to battle this one"
                                      defaultActiveFirstOption={false}
                                      showArrow={true}
                                      style={{ width: 300, marginRight: 15 }}
                                      filterOption={true}
                                      onChange={this.handleSelect}
                                      notFoundContent={null}
                                    >
                                        {owned_javagochis.map(jc => <Option key={jc.id}>{jc.nickname + " (" + jc.race.race + ")"}</Option>)}
                                    </Select>

                                    <Button type="primary" htmlType="submit">Challenge!</Button>
                                </Form>
                            </div>
                            :
                            <div></div>
                    }
                </div>
            );
        }
        else {
            return (
                <Loading />
            )
        }
    }
}

export default withRouter(JavagochiOwnedDetail);
