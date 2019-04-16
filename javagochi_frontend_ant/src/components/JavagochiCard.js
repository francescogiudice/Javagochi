import React from 'react'
import { Card } from 'antd';

const { Meta } = Card;

const JavagochiCard = (props) => {

    const javagochi = props.javagochi;
    
    return (

        <Card
          style={{ width: 300, height: 400 }}
          cover={<img alt="example" src={javagochi.image} style={{ width: 300, height: 300 }} />}
          hoverable
        >
          <Meta
            title={javagochi.race}
            description={"Cost: " + javagochi.cost}
          />
        </Card>
    )
}

export default JavagochiCard;
