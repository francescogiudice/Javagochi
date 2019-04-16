import React from 'react';
import { List, Avatar } from 'antd';
import JavagochiCard from './JavagochiCard';

import 'antd/dist/antd.css';

const JavagochiOwnedHorizontalList = (props) => {

    const javagochis = props.javagochis;

    return (
        <List
          itemLayout="horizontal"
          bordered="true"
          dataSource={javagochis}
          renderItem={javagochi => (
                <div className="hoverme">
                    <a href={"/detail/" + javagochi.race}>
                        <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={javagochi.image} />}
                          title={javagochi.race}
                          description={"Max health: " + javagochi.max_health}
                        />
                        </List.Item>
                    </a>
                </div>
          )}
        />
    );
}

export default JavagochiOwnedHorizontalList;
