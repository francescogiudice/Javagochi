import React from 'react';
import axios from 'axios';
import { Typography , Progress, Card, Row, Col, Button, Form, Input, Modal } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Title, Text } = Typography;

class JcDetail extends React.Component {

    state = {
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
            console.log(res);
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
        const javagochi = this.props.data.javagochi;
        console.log(this.props.data);

        return (

            <div style={{ padding: '30px' }}>

                <Modal
                  title="The page says:"
                  visible={this.state.popupVisible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <Text>{this.state.message}</Text>
                </Modal>

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

                            {
                                this.state.user === undefined ?
                                    <div>
                                        <p></p>
                                    </div>
                                :
                                    <div>
                                        <p>{"Your level: " + this.state.user.level}</p>
                                        <p>{"Your coins: " + this.state.user.coins}</p>
                                    </div>
                            }
                        </Card>
                    </Col>
                </Row>

                {
                    localStorage.getItem('username') !== null ?
                        <div>
                            <Form onSubmit={this.handleBuy}>
                                <input type="hidden" id="user" name="user" value={localStorage.getItem('username')} />
                                <input type="hidden" id="race" name="race" value={javagochi.race} />
                                <Input style={{ color: 'rgba(0,0,0,.25)', width: 300, marginRight: 15, marginBottom: 15 }} placeholder="Nickname" />
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
