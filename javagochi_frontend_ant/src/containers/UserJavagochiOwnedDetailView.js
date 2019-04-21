import React from 'react';
import axios from 'axios';
import { Typography, Form, Button, Select } from 'antd';
import { withRouter } from 'react-router-dom';

import JavagochiOwned from '../components/JavagochiOwned';
import Loading from '../components/Loading';
import ModalPopup from '../components/ModalPopup';

import '../styles/JcOwnedDetail.css';

const { Title } = Typography;
const Option = Select.Option;

class UserJavagochiOwnedDetail extends React.Component {

    state = {
        javagochi: {},
        items: [],
        next_level: {},
        owned_javagochis: [],
        challenger_javagochi_id: 0,
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
        this.props.history.push('/myjavagochis');
    }

    handleSelect = (val) => {
        console.log(val);
        this.setState({
            challenger_javagochi_id: val
        })
    }

    handleChallenge = (e) => {
        e.preventDefault();

        const id_challenged = this.state.javagochi.id;
        axios.put(`http://localhost:8000/api/javagochi/${id_challenged}/challenge/`, {
            id_challenger: this.state.challenger_javagochi_id
        })
        .then((res) => {
            this.setState({
                message: res.data
            });
            this.showModal();
            this.reloadJavagochi();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const user = localStorage.getItem('username');

        const token = localStorage.getItem('token');

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }

        axios.all([
            axios.get(`http://localhost:8000/api/javagochi/owned/${id}/`),
            axios.get(`http://localhost:8000/api/users/${user}/items/`),
            axios.get(`http://localhost:8000/api/users/${user}/javagochis/`)

        ])
        .then(axios.spread((jcRes, itemRes, ownedjcRes) => {
            this.setState({
                javagochi: jcRes.data,
                items: itemRes.data,
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
        const next_level = this.state.next_level;
        const owned_javagochis = this.state.owned_javagochis;

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

                    <Title>{"Owner of this Javagochi: " + javagochi.owner.username}</Title>
                    <JavagochiOwned jc={javagochi} exp={next_level}/>

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

export default withRouter(UserJavagochiOwnedDetail);
