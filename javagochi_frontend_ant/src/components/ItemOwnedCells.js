import React from 'react';
import { List, Card } from 'antd';

import 'antd/dist/antd.css';

const { Meta } = Card;

const ItemOwnedCells = (props) => {

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

            renderItem={item => (
                <List.Item key={item.item.name}>

                    <a href={"/myitems/" + item.id}>
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
                    </a>
                </List.Item>
            )}
        />
    )
}

export default ItemOwnedCells;
