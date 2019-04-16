import React from 'react';
import { List, Avatar } from 'antd';

import 'antd/dist/antd.css';

const ItemsOwnedHorizontalList = (props) => {

    const items = props.items;

    return (
        <List
          itemLayout="horizontal"
          bordered="true"
          dataSource={items}
          renderItem={item => (
                <div className="hoverme">
                <a href={"/myitems/" + item.id}>
                <List.Item onClick={(e) => {
                console.log(e);
                }}>
                <List.Item.Meta
                avatar={<Avatar src={item.item.image} />}
                title={item.item.name + "(" + item.amount_owned + ")"}
                description={item.item.property_modified + ": " + item.item.amount_modified}
                />
                </List.Item>
                </a>
                </div>
          )}
        />
    );
}

export default ItemsOwnedHorizontalList;
