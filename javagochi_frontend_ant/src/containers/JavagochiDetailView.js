import React from 'react';
import { getUser } from "../store/actions/auth";
import { getJcRace, buyJavagochi } from '../store/actions/javagochi';
import { connect } from 'react-redux';
import { Typography, Button, Form, Input, Modal } from 'antd';
import { Link } from 'react-router-dom';

import JavagochiRace from '../components/JavagochiRace';
import Loading from '../components/Loading';

const { Text } = Typography;

class JavagochiDetail extends React.Component {

    state = {
        popupVisible: false
    }

    showModal = (e) => {
        this.setState({
            popupVisible: true
        });
    }

    handleOk = (e) => {
        this.setState({
            popupVisible: false
        });
        this.props.history.push('/myjavagochis');
    }

    handleCancel = (e) => {
        this.setState({
            popupVisible: false
        });
    }

    handleBuy = (e) => {
        e.preventDefault();
        const user = e.target[0].value;
        const race = e.target[1].value;
        const nickname = e.target[2].value;

        this.props.dispatch(buyJavagochi(race, user, nickname));
        this.showModal();
    }

    componentDidMount() {
        const race = this.props.match.params.jcRace;
        const user = localStorage.getItem('username');

        this.props.dispatch(getJcRace(race));
        if(user) {
            this.props.dispatch(getUser(user));
        }
    }

    render() {
        const javagochi = this.props.javagochi;
        const user = this.props.user;

        if(javagochi.race !== undefined) {
            return (
                <div>
                    <Modal
                      title="The page says:"
                      visible={this.state.popupVisible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                    >
                      <Text>{this.props.message}</Text>
                    </Modal>

                    <JavagochiRace javagochi={javagochi}/>

                    {
                        user === undefined ?
                            <Button type="primary" style={{margin: 20}}><Link to="/login">Login to buy this Javagochi!</Link></Button>
                        :
                            <div>
                                <p>{"Your level: " + user.level}</p>
                                <p>{"Your coins: " + user.coins}</p>

                                <div>
                                    <Form onSubmit={this.handleBuy}>
                                        <input type="hidden" id="user" name="user" value={localStorage.getItem('username')} />
                                        <input type="hidden" id="race" name="race" value={javagochi.race} />
                                        <Input style={{ color: 'rgba(0,0,0,.25)', width: 300, marginRight: 15, marginBottom: 15 }} placeholder="Nickname" />
                                        <Button type="primary" htmlType="submit">Purchase</Button>
                                    </Form>
                                </div>
                            </div>
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
    // Check if there is a user
    if(state.userReducer.token === null) {
        return {
            javagochi: state.jcReducer.selectedRace,
            message: state.jcReducer.message,
            showModal: state.jcReducer.performingBuy
        }
    }
    else {
        return {
            javagochi: state.jcReducer.selectedRace,
            user: state.userReducer.user,
            message: state.jcReducer.message,
            showModal: state.jcReducer.performingBuy
        }
    }
}

export default connect(mapStateToProps)(JavagochiDetail);
