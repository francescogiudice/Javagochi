import React from 'react'
import { Card } from 'antd';

const { Meta } = Card;

const OwnedItemCard = (props) => {

    const item = props.item;

    return (

        <Card
          style={{ width: 300, height: 400 }}
          cover={<img alt="example" src={item.item.image} style={{ width: 300, height: 300 }} />}
          hoverable
        >
            <Meta
              title={item.item.name + " (" + item.amount_owned + ")"}
              description={item.item.property_modified + ": +" + item.item.amount_modified}
            />
        </Card>
    )
}

export default OwnedItemCard;
