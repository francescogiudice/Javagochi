import React from 'react';
import axios from 'axios';
import { Typography, Button, Form, Input, Modal } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import JavagochiRace from '../components/JavagochiRace';
import Loading from '../components/Loading';

const { Text } = Typography;

class JavagochiDetail extends React.Component {

    state = {
        javagochi: {},
        user: {},
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

        axios.post("http://localhost:8000/api/javagochi/buy/", {
          user: e.target[0].value,
          race: e.target[1].value,
          nickname: e.target[2].value
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
        const race = this.props.match.params.jcRace;

        axios.get(`http://localhost:8000/api/javagochi/${race}`)
        .then((res) => {
            this.setState({
                javagochi: res.data
            });
        });

        const user = localStorage.getItem('username');

        if(user) {
            axios.get(`http://localhost:8000/api/users/${user}/info/`)
            .then((res) => {
                this.setState({
                    user: res.data
                });
            });
        }
        else {
            this.setState({
                user: undefined
            })
        }
    }

    render() {
        const javagochi = this.state.javagochi;
        const user = this.state.user;

        if(javagochi.race !== undefined) {
            return (
                <div>
                <Modal
                  title="The page says:"
                  visible={this.state.popupVisible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <Text>{this.state.message}</Text>
                </Modal>

                <JavagochiRace javagochi={javagochi}/>

                {
                    user === undefined ?
                        <Button type="primary" style={{margin: 20}}><Link to="/login">Login to buy this Javagochi!</Link></Button>
                    :
                        <div>
                            <p>{"Your level: " + this.state.user.level}</p>
                            <p>{"Your coins: " + this.state.user.coins}</p>

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

export default withRouter(JavagochiDetail);
