import React from 'react';
import { Typography , Progress, Card, Row, Col, Spin } from 'antd';
import JcDetail from './JcDetail';
import JcOwnedDetail from './JcOwnedDetail';

const { Meta } = Card;
const { Title } = Typography;

class TradeDetail extends React.Component {

    state = {
        changin: false
    }

    render() {
        const trade = this.props.data.trade;
        console.log(trade);

        if(trade.offering === undefined) {
            return (
                <div>
                    <Title>Loading</Title>
                    <Spin />
                </div>
            )
        }
        else {
            const jc_offered = trade.offering;
            const user = trade.offering.owner.username;
            const trade_for = trade.interested_into;
            return (

                <div style={{ padding: '30px' }}>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Title>{user + " offers " + jc_offered.nickname + " (" + jc_offered.race.race + ")"}</Title>
                            <Card
                                bordered={false}
                                cover={<img alt="example" src={jc_offered.race.image} />}
                            >
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                title="Statistics"
                                bordered={false}
                            >
                                <Progress percent={(100 * jc_offered.current_health) / jc_offered.race.max_health} size="small" showInfo={false} />
                                <p>{"Health: " + trade.offering.current_health + "/" + trade.offering.race.max_health}</p>

                                <Progress percent={(100 * jc_offered.current_age) / jc_offered.race.max_age} size="small" showInfo={false} />
                                <p>{"Age: " + trade.offering.current_age}</p>

                                <Progress percent={(100 * trade.offering.current_hunger) / trade.offering.race.max_hunger} size="small" showInfo={false} />
                                <p>{"Hunger: " + trade.offering.current_hunger + "/" + trade.offering.race.max_hunger}</p>

                                <Progress percent={(100 * trade.offering.current_hot) / trade.offering.race.max_hot} size="small" showInfo={false} />
                                <p>{"Hot: " + trade.offering.current_hot + "/" + trade.offering.race.max_hot}</p>

                                <Progress percent={(100 * trade.offering.current_cold) / trade.offering.race.max_cold} size="small" showInfo={false} />
                                <p>{"Cold: " + trade.offering.current_cold + "/" + trade.offering.race.max_cold}</p>

                                <br/>

                                <p>{"Level: " + trade.offering.current_level}</p>

                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Title>For</Title>
                            <h2>{trade_for.race}</h2>
                            <Card
                                bordered={false}
                                cover={<img alt="example" src={trade_for.image} />}
                            >
                            </Card>
                        </Col>
                    </Row>


                </div>
            )
        }
    }
}

export default TradeDetail;
