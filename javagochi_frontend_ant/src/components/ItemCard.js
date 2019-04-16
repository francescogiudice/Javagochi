import React from 'react'
import { Card } from 'antd';

const { Meta } = Card;

const ItemCard = (props) => {

    const item = props.item;

    return (

        <Card
          style={{ width: 300, height: 400 }}
          cover={<img alt="example" src={item.image} style={{ width: 300, height: 300 }} />}
          hoverable
        >
          <Meta
            title={item.name}
            description={"Cost: " + item.cost}
          />
        </Card>
    )
}

export default ItemCard;
