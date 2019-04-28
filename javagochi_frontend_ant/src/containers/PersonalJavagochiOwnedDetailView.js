import React from 'react';
import { Typography, Button } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getOwnedJcById, useItem } from "../store/actions/ownedJavagochi";
import { connect } from 'react-redux';

import JavagochiOwned from '../components/JavagochiOwned';
import Loading from '../components/Loading';
import ModalPopup from '../components/ModalPopup';
import ModalSelectRace from '../components/ModalSelectRace';
import ItemsOwnedHorizontalList from '../components/ItemsOwnedHorizontalList';

import '../styles/JcOwnedDetail.css';

const { Text } = Typography;

class PersonalJavagochiOwnedDetail extends React.Component {

    state = {
        javagochi: {},
        items: [],
        nextLevel: {},
        allJavagochiRaces: [],
        isTraded: false,
        selectedRaceToTrade: "",
        popupVisible: false,
        message: "",
        showRaceModal: false
    }

    showPopupMessageModal = (e) => {
        this.setState({
            popupVisible: true
        });
    }

    initiateTrade = (e) => {
        this.setState({
            showRaceModal: true
        })
    }

    handleOk = (e) => {
        this.setState({
            popupVisible: false,
            showRaceModal: false,
            isTraded: true
        });
        this.props.history.push('/mytrades');
    }

    handleCancel = (e) => {
        this.setState({
            popupVisible: false,
            showRaceModal: false
        });
    }

    handleSelection = (val) => {
        this.setState({
            selectedRaceToTrade: val
        });
    }

    handleUseItem = (item) => {
        const id = this.props.match.params.id;

        this.props.dispatch(useItem(item, id));
    }

    handleTradeStart = (e) => {
        e.preventDefault();
        console.log("Initiating trade. Trading " + this.state.javagochi.nickname + " for a " + this.state.selectedRaceToTrade);

        axios.post("http://localhost:8000/api/trades/add/", {
          offered_id: this.state.javagochi.id,
          interested_into: this.state.selectedRaceToTrade,
        })
        .then((res) => {
            this.setState({
                message: res.data,
                isTraded: true
            });
            this.showPopupMessageModal();
        })
        .catch((err) => {
            console.log(err.response);
            if(err.response.data !== undefined) {
                this.setState({
                    message: err.response.data
                });
                this.showPopupMessageModal();
            }
        });
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const user = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        this.props.dispatch(getOwnedJcById(id));

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }

        axios.all([
            axios.get(`http://localhost:8000/api/users/${user}/items/`),
            axios.get(`http://localhost:8000/api/users/${user}/javagochis/`),
            axios.get(`http://localhost:8000/api/users/${user}/trades/`),
            axios.get('http://localhost:8000/api/javagochi/market/')

        ])
        .then(axios.spread((itemRes, ownedjcRes, tradeRes, allRes) => {
            const isTraded = tradeRes.data.filter(function (trade) { return trade.offering.id === parseInt(id); }).length > 0;

            this.setState({
                items: itemRes.data,
                isTraded: isTraded,
                allJavagochiRaces: allRes.data,
                owned_javagochis: ownedjcRes.data
            });

            const lvl = this.props.javagochi.current_level;
            axios.get(`http://localhost:8000/api/javagochi/expmap/${lvl}/`)
            .then(res => {
                this.setState({
                    nextLevel: res.data
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

            const lvl = this.props.javagochi.current_level;
            axios.get(`http://localhost:8000/api/javagochi/expmap/${lvl}/`)
            .then(res => {
                this.setState({
                    nextLevel: res.data
                })
            })
        });
    }

    render() {
        const javagochi = this.props.javagochi;
        const items = this.state.items;
        const nextLevel = this.state.nextLevel;
        const allRaces = this.state.allJavagochiRaces;
        const selectedRace = this.state.selectedRaceToTrade;

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

                    <ModalSelectRace
                      visible={this.state.showRaceModal}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      handleAction={this.handleTradeStart}
                      handleSelection={this.handleSelection}
                      races={allRaces}
                      selectedRace={selectedRace}
                    />

                    <JavagochiOwned jc={javagochi} exp={nextLevel}/>

                    <Text>Items</Text>
                    <ItemsOwnedHorizontalList
                      items={items}
                      onClick={this.handleUseItem}
                    />

                    {
                        !this.state.isTraded ?
                            <div style={{ marginTop: 15 }}>
                                <Button type="primary" onClick={this.initiateTrade}>Choose a Javagochi to trade this</Button>
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

const mapStateToProps = state => {
    return {
        javagochi: state.ownedJcReducer.selectedJc
    }
}

export default connect(mapStateToProps)(PersonalJavagochiOwnedDetail);
