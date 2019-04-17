import React from 'react'
import { Typography, Progress, Card, Row, Col } from 'antd';

const { Title } = Typography;

const JavagochiOwned = (props) => {

    const javagochi = props.jc;
    const next_level = props.exp;

    return (

        <div style={{ padding: '30px' }}>
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

                        <Progress percent={(javagochi.race.strength) / 100} size="small" showInfo={false} />
                        <p>{"Strength: " + javagochi.race.strength}</p>

                        <br/>

                        <p>{"Level: " + javagochi.current_level}</p>

						<Progress type="circle" percent={(100 * javagochi.current_experience) / next_level.exp_for_next_level} size="small" showInfo={false} />
						<p>{"Experience: " + javagochi.current_experience + "/" + next_level.exp_for_next_level}</p>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default JavagochiOwned;
