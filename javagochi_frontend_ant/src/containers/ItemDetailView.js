import React from 'react';
import axios from 'axios';
import { Button, Form, InputNumber  } from 'antd';
import { Link } from 'react-router-dom';
import ItemDetail from '../components/ItemDetail';

class ItDetail extends React.Component {

    state = {
        item: {},
        buying: 1
    }

    handleBuy(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if(token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        }
        else {
            axios.defaults.headers = {
                "Content-Type": "application/json"
            }
        }
        axios.post("http://localhost:8000/api/items/buy/", {
            user: e.target[0].value,
            item: e.target[1].value,
            amount: e.target[2].value,
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    increaseAmount(value) {
        this.setState({
            buying: value
        });
    }

    componentDidMount() {
        const itemName = this.props.match.params.itemName;
        axios.get(`http://localhost:8000/api/items/${itemName}`)
            .then(res => {
                this.setState({
                    item: res.data
                });
            });
    }

    render() {

        const item = this.state.item;

        if(localStorage.getItem('username') !== undefined && localStorage.getItem('username') !== null) {
            return (
                <div>
                    <ItemDetail item={item} />

                    <Form onSubmit={this.handleBuy}>
                        <input type="hidden" id="user" name="user" value={localStorage.getItem('username')} />
                        <input type="hidden" id="race" name="race" value={item.name} />
                        <InputNumber min={1} max={99} defaultValue={1} onChange={this.increaseAmount} style={{ width: 85, marginRight: 15, marginBottom: 15 }} />
                        <Button type="primary" htmlType="submit" style={{marginLeft: 10 }}>{"Purchase (" + item.cost * this.state.buying + " coins)"}</Button>
                    </Form>
                </div>
            );
        }
        else {
            return (
                <div>
                    <ItemDetail item={this.state.item} />

                    <Button type="primary" style={{margin: 20}}><Link to="/login">Login to buy this item!</Link></Button>
                </div>
            )
        }
    }
}

export default ItDetail;
