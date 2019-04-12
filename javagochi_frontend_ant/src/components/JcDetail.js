import React from 'react';
import axios from 'axios';
import { Typography , Progress, Card, Row, Col, Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Title } = Typography;

class JcDetail extends React.Component {

    handleBuy = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/javagochi/buy/", {
            user: e.target[0].value,
            race: e.target[1].value,
            nickname: e.target[2].value
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        const javagochi = this.props.data;
        return (

            <div style={{ padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Title>{javagochi.race}</Title>
                        <Card
                            bordered={false}
                            cover={<img alt="example" src={javagochi.image} />}
                        >
                            <Meta title={javagochi.race + ", " + parseInt(javagochi.cost) + " coins"} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            title="Statistics"
                            bordered={false}
                        >
                            <p>{"Health: " + javagochi.max_health + "/" + javagochi.max_health}</p>
                            <Progress percent={100} size="small" showInfo={false} />

                            <p>{"Maximum age: " + javagochi.max_age}</p>
                            <Progress percent={0} size="small" showInfo={false} />

                            <p>{"Hunger: 0/" + javagochi.max_hunger}</p>
                            <Progress percent={0} size="small" showInfo={false} />

                            <p>{"Hot: 0/" + javagochi.max_hot}</p>
                            <Progress percent={0} size="small" showInfo={false} />

                            <p>{"Cold: 0/" + javagochi.max_cold}</p>
                            <Progress percent={0} size="small" showInfo={false} />


                            <p>{"Min. user level: " + javagochi.min_user_level}</p>
                            <p>{"Current level: WIP"}</p>
                        </Card>
                    </Col>
                </Row>

                {
                    localStorage.getItem('username') !== undefined ?
                        <div>
                            <Form onSubmit={this.handleBuy}>
                                <input type="hidden" id="user" name="user" value={localStorage.getItem('username')} />
                                <input type="hidden" id="race" name="race" value={javagochi.race} />
                                <Input style={{ color: 'rgba(0,0,0,.25)' }} placeholder="Nickname" />
                                <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>Purchase</Button>
                            </Form>
                        </div>
                    :
                        <Button type="primary" style={{margin: 20}}><Link to="/login">Login to buy this Javagochi!</Link></Button>
                }


            </div>
        )
    }
}

export default JcDetail;
