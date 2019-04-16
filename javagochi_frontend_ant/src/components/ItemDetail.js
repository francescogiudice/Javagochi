import React from 'react';
import { Typography, Card, Row, Col } from 'antd';

const { Meta } = Card;
const { Title, Text } = Typography;

const ItemDetail = (props) => {

    const item = props.item;
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
                        <Text>{"Modified value: " + item.property_modified}</Text>
                        <br/>
                        <Text>{"Amount modified: " + item.amount_modified}</Text>
                        <br/>
                        <Text>{"Buying this will give you: " + item.exp_on_buy + " exp"}</Text>
                        <br/>
                        <Text>{"Using this will give you: " + item.user_exp_on_use + " exp"}</Text>
                        <br/>
                        <Text>{"Using this will give your Javagochi: " + item.jc_exp_on_use + " exp"}</Text>
                        <br/>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ItemDetail;
