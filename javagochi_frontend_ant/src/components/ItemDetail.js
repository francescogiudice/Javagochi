import React from 'react';
import axios from 'axios';
import { Typography, Card, Row, Col, Button, Form, InputNumber  } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Title, Text } = Typography;

class ItemDetail extends React.Component {

    state = {
        buying: 1
    }

    handleBuy = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/items/buy/", {
            user: e.target[0].value,
            item: e.target[1].value,
            amount: e.target[2].value,
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    increaseAmount = (value) => {
        this.setState({
            buying: value
        });
    }

    render() {
        const item = this.props.data;
        return (

            <div style={{ padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Title>{item.name}</Title>
                        <Card
                            bordered={false}
                            cover={<img alt="example" src={item.image} />}
                        >
                            <Meta title={item.name + ", " + item.cost + " coins"} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            title="Info"
                            bordered={false}
                        >
                            <p>{"Modified value: " + item.property_modified}</p>
                            <p>{"Amount modified: " + item.amount_modified}</p>
                            <p>{"Buying this will give you: " + item.exp_on_buy + " exp"}</p>
                            <p>{"Using this will give you: " + item.user_exp_on_use + " exp"}</p>
                            <p>{"Using this will give your Javagochi: " + item.jc_exp_on_use + " exp"}</p>
                        </Card>
                    </Col>
                </Row>

                {
                    localStorage.getItem('username') !== undefined ?
                        <div>
                            <Form onSubmit={this.handleBuy}>
                                <input type="hidden" id="user" name="user" value={localStorage.getItem('username')} />
                                <input type="hidden" id="race" name="race" value={item.name} />
                                <InputNumber min={1} max={99} defaultValue={1} onChange={this.increaseAmount} />
                                <Text>Total: {item.cost * this.state.buying} coins</Text>
                                <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>Purchase</Button>
                            </Form>
                        </div>
                    :
                        <Button type="primary" style={{margin: 20}}><Link to="/login">Login to buy this item!</Link></Button>
                }


            </div>
        )
    }
}

export default ItemDetail;
