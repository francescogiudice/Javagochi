import React from 'react'
import { Card } from 'antd';

const { Meta } = Card;

const JavagochiOwnedCard = (props) => {

    const javagochi = props.javagochi;

    return (

        <Card
          style={{ width: 300, height: 400 }}
          cover={<img alt="example" src={javagochi.race.image} style={{ width: 300, height: 300 }} />}
          hoverable
        >
            <Meta
              title={javagochi.nickname + ", " + javagochi.race.race}
              description={"Health: " + javagochi.current_health + "/" + javagochi.race.max_health}
            />
        </Card>
    )
}

export default JavagochiOwnedCard;
