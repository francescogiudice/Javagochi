import React from 'react';
import { List, Avatar } from 'antd';

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
                    <a href={"/myjavagochis/" + javagochi.id}>
                        <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={javagochi.race.image} />}
                          title={javagochi.nickname + " (" + javagochi.race.race + ")"}
                          description={"Health: " + javagochi.current_health * 100 / javagochi.race.max_health + "%"}
                        />
                        </List.Item>
                    </a>
                </div>
          )}
        />
    );
}

export default JavagochiOwnedHorizontalList;
