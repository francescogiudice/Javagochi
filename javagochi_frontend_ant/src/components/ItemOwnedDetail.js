import React from 'react'
import { Typography, Card, Row, Col, Spin } from 'antd';

const { Title } = Typography;

const ItemOwnedDetail = (props) => {
    const item = props.data;

    return (

        <div style={{ padding: '30px' }}>
                {
                    item.item === undefined ?
                        <div>
                            <Title>Loading</Title>
                            <Spin />
                        </div>
                    :
                        <Row gutter={16}>
                            <Col span={8}>
                                <Title>{item.item.name}</Title>
                                <Card
                                    bordered={false}
                                    cover={<img alt="example" src={item.item.image} />}
                                >
                                </Card>
                            </Col>

                            <Col span={8}>
                                <Card
                                    title="Info"
                                    bordered={false}
                                >
                                    <p>{item.item.property_modified + ": +" + item.item.amount_modified}</p>
                                    <p>{"Using this will give you: " + item.item.user_exp_on_use + " exp"}</p>
                                    <p>{"Using this will give your Javagochi: " + item.item.jc_exp_on_use + " exp"}</p>
                                    <p>{"You own: " + item.amount_owned}</p>
                                </Card>
                            </Col>
                        </Row>
                }
        </div>
    )
}

export default ItemOwnedDetail;
