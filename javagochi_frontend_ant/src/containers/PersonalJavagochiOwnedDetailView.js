import React from 'react';
import { Typography, Button } from 'antd';
// import { withRouter } from 'react-router-dom';
import { getOwnedJcById, useItem } from "../store/actions/ownedJavagochi";
import { addTrade } from '../store/actions/trades';
import { getJcRaces } from "../store/actions/javagochi";
import { getUserItems } from '../store/actions/ownedItems';
import { getAllUserTrades } from '../store/actions/trades';
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
        selectedRaceToTrade: "",
        popupVisible: false,
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
            showRaceModal: false
        });
        this.props.history.push('/myprofile/mytrades');
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
        const offeredId = this.props.match.params.id;
        const interestedInto = this.state.selectedRaceToTrade;

        this.props.dispatch(addTrade(offeredId, interestedInto));
        this.showPopupMessageModal();
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const user = localStorage.getItem('username');

        this.props.dispatch(getOwnedJcById(id));
        this.props.dispatch(getJcRaces());
        this.props.dispatch(getAllUserTrades(user));
        this.props.dispatch(getUserItems(user));
    }

    render() {
        const javagochi = this.props.javagochi;
        const jcRaces = this.props.javagochis;
        const items = this.props.items;
        const nextLevel = this.props.nextLevel;
        const selectedRace = this.state.selectedRaceToTrade;
        var isTraded = false;

        if(this.props.userTrades.length > 0) {
            const trades = this.props.userTrades;
            isTraded = trades.filter(function (trade) { return trade.offering.id === parseInt(javagochi.id); }).length > 0;
        }
        else {
            isTraded = false;
        }

        if(javagochi.nickname !== undefined) {
            return (
                <div>
                    <ModalPopup
                      title="The page says:"
                      visible={this.state.popupVisible}
                      onCancel={this.handleCancel}
                      onOk={this.handleOk}
                      text={this.props.message}
                    />

                    <ModalSelectRace
                      visible={this.state.showRaceModal}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      handleAction={this.handleTradeStart}
                      handleSelection={this.handleSelection}
                      races={jcRaces}
                      selectedRace={selectedRace}
                    />

                    <JavagochiOwned jc={javagochi} exp={nextLevel}/>

                    <Text>Items</Text>
                    <ItemsOwnedHorizontalList
                      items={items}
                      onClick={this.handleUseItem}
                    />

                    {
                        !isTraded ?
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
        javagochi: state.ownedJcReducer.selectedJc,
        nextLevel: state.ownedJcReducer.level,
        javagochis: state.jcReducer.jcRaces,
        items: state.ownedItemsReducer.items,
        userTrades: state.tradesReducer.userTrades,
        message: state.tradesReducer.message
    }
}

export default connect(mapStateToProps)(PersonalJavagochiOwnedDetail);
