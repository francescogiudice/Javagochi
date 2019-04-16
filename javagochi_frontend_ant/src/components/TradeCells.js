import React from 'react';
import { List, Card } from 'antd';

import 'antd/dist/antd.css';

const { Meta } = Card;

const TradeCells = (props) => {

    return (
        <List
            grid={{
              gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 6
            }}
            size = "large"
            pagination = {
                {
                    onChange: (page) => {
                    },
                    pageSize: 12,
                }
            }
            dataSource = {props.data}

            renderItem={trade => (
                <List.Item key={trade.id}>

                    <a href={"/trades/" + trade.id}>
                        <Card
                          style={{ width: 300, height: 400 }}
                          cover={<img alt="example" src={trade.offering.race.image} style={{ width: 300, height: 300 }} />}
                          hoverable
                        >
                          <Meta
                            title={trade.offering.nickname + " (" + trade.offering.race.race + ")"}
                            description={"Offered by " + trade.offering.owner.username}
                          />
                        </Card>
                    </a>
                </List.Item>
            )}
        />
    )
}

export default TradeCells;
