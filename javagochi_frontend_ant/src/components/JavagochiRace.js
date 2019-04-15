import React from 'react';
import { Typography , Progress, Card, Row, Col } from 'antd';

const { Meta } = Card;
const { Title } = Typography;

const JavagochiRace = (props) => {
    const javagochi = props.javagochi

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

                        </Card>
                    </Col>
                </Row>

            </div>
        )
}

export default JavagochiRace;
