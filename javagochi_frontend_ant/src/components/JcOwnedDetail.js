import '../styles/JcOwnedDetail.css';
import React from 'react'
import axios from 'axios';
import { Typography, Progress, Card, Row, Col, Spin, List, Avatar } from 'antd';

const { Title } = Typography;

class JcOwnedDetail extends React.Component {

    state = {
        changin: false
    }

    render() {
        const javagochi = this.props.data.javagochi;
        const items = this.props.data.items;
        const next_level = this.props.data.next_level;

        return (

            <div style={{ padding: '30px' }}>
                    {
                        javagochi.race === undefined ?
                            <div>
                                <Title>Loading</Title>
                                <Spin />
                            </div>
                        :
                            <div>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Title>{javagochi.nickname + ", " + javagochi.race.race}</Title>
                                        <Card
                                            bordered={false}
                                            cover={<img alt="example" src={javagochi.race.image} />}
                                        >
                                        </Card>
                                    </Col>

                                    <Col span={8}>
                                        <Card
                                            title="Statistics"
                                            bordered={false}
                                        >
                                            <Progress percent={(100 * javagochi.current_health) / javagochi.race.max_health} size="small" showInfo={false} />
                                            <p>{"Health: " + javagochi.current_health + "/" + javagochi.race.max_health}</p>

                                            <Progress percent={(100 * javagochi.current_age) / javagochi.race.max_age} size="small" showInfo={false} />
                                            <p>{"Age: " + javagochi.current_age}</p>

                                            <Progress percent={(100 * javagochi.current_hunger) / javagochi.race.max_hunger} size="small" showInfo={false} />
                                            <p>{"Hunger: " + javagochi.current_hunger + "/" + javagochi.race.max_hunger}</p>

                                            <Progress percent={(100 * javagochi.current_hot) / javagochi.race.max_hot} size="small" showInfo={false} />
                                            <p>{"Hot: " + javagochi.current_hot + "/" + javagochi.race.max_hot}</p>

                                            <Progress percent={(100 * javagochi.current_cold) / javagochi.race.max_cold} size="small" showInfo={false} />
                                            <p>{"Cold: " + javagochi.current_cold + "/" + javagochi.race.max_cold}</p>

                                            <br/>

                                            <p>{"Level: " + javagochi.current_level}</p>

                                            <Progress type="circle" percent={(100 * javagochi.current_experience) / next_level.exp_for_next_level} size="small" showInfo={false} />
                                            <p>{"Experience: " + javagochi.current_experience + "/" + next_level.exp_for_next_level}</p>
                                        </Card>
                                    </Col>
                                </Row>

                                <div>
                                    <List
                                      itemLayout="horizontal"
                                      bordered="true"
                                      dataSource={items}
                                      renderItem={item => (
                                            <div className="hoverme">
                                                <List.Item onClick={(e) => {
                                                    e.preventDefault();
                                                    const id = javagochi.id;
                                                    axios.put(`http://localhost:8000/api/javagochi/owned/${id}/useitem/`, {
                                                        item: item.item.name,
                                                        user: localStorage.getItem('username')
                                                    })
                                                    .then((res) => {
                                                        console.log(res);
                                                        this.props.onUpdate();
                                                    })
                                                    .catch((err) => {
                                                        console.log(err);
                                                    });
                                                }}>
                                                    <List.Item.Meta
                                                      avatar={<Avatar src={item.item.image} />}
                                                      title={item.item.name + "(" + item.amount_owned + ")"}
                                                      description={item.item.property_modified + ": " + item.item.amount_modified}
                                                    />
                                                </List.Item>
                                            </div>
                                      )}
                                    />
                                </div>
                            </div>
                    }
            </div>
        )
    }
}

export default JcOwnedDetail;
