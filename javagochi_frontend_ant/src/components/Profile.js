import React from 'react';
import { Typography , Progress, Card, Row, Col, List, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Profile = (props) => {
    const user = props.data.user;
    const next_level = props.data.next_level;
    const javagochis = props.data.javagochis;
    const items = props.data.items;

    return (
            <div style={{ padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Title>{user.username}</Title>
                        {
                            user.image !== "" ?
                                <Card
                                    bordered={false}
                                    cover={<img alt="user" src={user.image} />}
                                ></Card>
                            :
                                <Card
                                    bordered={false}
                                    cover={<img alt="user" src="https://openclipart.org/download/247324/abstract-user-flat-1.svg" />}
                                >
                                </Card>
                        }

                    </Col>

                    <Col span={8}>
                        <Card
                            title="Info"
                            bordered={false}
                        >
                            <p>{"Coins: " + user.coins}</p>

                            <p>{"Level: " + user.level}</p>

                            <Progress type="circle" percent={(100 * user.exp) / next_level.exp_for_next_level} size="small" showInfo={false} />
                            <p>{"Exp: " + user.exp + "/" + next_level.exp_for_next_level}</p>

                        </Card>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <List
                          itemLayout="horizontal"
                          bordered="true"
                          dataSource={javagochis}
                          renderItem={javagochi => (
                                <div className="hoverme">
                                    <a href={"/myjavagochis/" + javagochi.id}>
                                        <List.Item>
                                            <List.Item.Meta
                                              avatar={<Avatar src={javagochi.race.image} />}
                                              title={javagochi.nickname + " (" + javagochi.race.race + ")"}
                                              description={"Health: " + javagochi.current_health * 100 / javagochi.race.max_health + "%"}
                                            />
                                        </List.Item>
                                    </a>
                                </div>
                          )}
                        />
                    </Col>

                    <Col span={8}>
                        <List
                          itemLayout="horizontal"
                          bordered="true"
                          dataSource={items}
                          renderItem={item => (
                                <div className="hoverme">
                                    <a href={"/myitems/" + item.id}>
                                        <List.Item onClick={(e) => {
                                            console.log(e);
                                        }}>
                                            <List.Item.Meta
                                              avatar={<Avatar src={item.item.image} />}
                                              title={item.item.name + "(" + item.amount_owned + ")"}
                                              description={item.item.property_modified + ": " + item.item.amount_modified}
                                            />
                                        </List.Item>
                                    </a>
                                </div>
                          )}
                        />
                    </Col>
                </Row>

                <Button type="primary" style={{margin: 20}}><Link to="/profile/change">Change info</Link></Button>
            </div>
    )
}

export default Profile;
