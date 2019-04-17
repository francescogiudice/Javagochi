import React from 'react';
import { List, Avatar } from 'antd';

import 'antd/dist/antd.css';

const ItemsOwnedHorizontalList = (props) => {

    const items = props.items;
    const onClick = props.onClick;

    return (

        <List
          itemLayout="horizontal"
          bordered="true"
          style={{ width: 400 }}
          dataSource={items}
          renderItem={item => (
                <div className="hoverme">
                    <List.Item onClick={ () => onClick(item) }>
                        <List.Item.Meta
                          avatar={<Avatar src={item.item.image} />}
                          title={item.item.name + "(" + item.amount_owned + ")"}
                          description={item.item.property_modified + ": " + item.item.amount_modified}
                        />
                    </List.Item>
                </div>
          )}
        />
    );
}

export default ItemsOwnedHorizontalList;
