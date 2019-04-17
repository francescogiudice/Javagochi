import React from 'react';
import axios from 'axios';
import { Form, Button, Select } from 'antd';
import { withRouter } from 'react-router-dom';

import JavagochiOwned from '../components/JavagochiOwned';
import Loading from '../components/Loading';
import ModalPopup from '../components/ModalPopup';
import ItemsOwnedHorizontalList from '../components/ItemsOwnedHorizontalList';

import '../styles/JcOwnedDetail.css';

const Option = Select.Option;

class PersonalJavagochiOwnedDetail extends React.Component {

    state = {
        javagochi: {},
        items: [],
        next_level: {},
        all_javagochi_races: [],
        is_traded: false,
        selected_race_trade: "",
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

    handleUseItem = (item) => {
        const id = this.state.javagochi.id;
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
            console.log(all_javagochi_races);

            this.setState({
                javagochi: jcRes.data,
                items: itemRes.data,
                is_traded: is_traded,
                all_javagochi_races: all_javagochi_races,
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
        const all_races = this.state.all_javagochi_races;

        if(javagochi.nickname !== undefined) {
            return (
                <div>
                    <ModalPopup
                      title="The page says:"
                      visible={this.state.popupVisible}
                      onCancel={this.handleCancel}
                      onOk={this.handleOk}
                      text={this.state.message}
                    />

                    <JavagochiOwned jc={javagochi} exp={next_level}/>

                    <ItemsOwnedHorizontalList
                      items={items}
                      onClick={this.handleUseItem}
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
            );
        }
        else {
            return (
                <Loading />
            )
        }
    }
}

export default withRouter(PersonalJavagochiOwnedDetail);
