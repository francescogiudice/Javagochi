import React from 'react';
import { Typography, Progress, Card, Row, Col, Avatar } from 'antd';

const { Title } = Typography;

const Profile = (props) => {
    const user = props.user;
    const next_level = props.next_level;

    return (
        <div>
            <Row>
                <Col span={8}>
                    <Title>{user.username}</Title>
                    {
                        user.image !== "" ?
                            <Card
                              bordered={false}
                              cover={<Avatar alt="user" src={user.image} style={{ width: 500, height: 500 }} />}
                            ></Card>
                        :
                            <Card
                              bordered={false}
                              cover={<img alt="user" src="https://openclipart.org/download/247324/abstract-user-flat-1.svg" />}
                            ></Card>
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
        </div>
    )
}

export default Profile;
