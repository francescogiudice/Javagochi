import React from 'react';
import { List } from 'antd';
import OwnedItemCard from './OwnedItemCard';

import 'antd/dist/antd.css';

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

                    <a href={"/myprofile/myitems/" + item.id}>
                        <OwnedItemCard item={item} />
                    </a>
                </List.Item>
            )}
        />
    )
}

export default ItemOwnedCells;
