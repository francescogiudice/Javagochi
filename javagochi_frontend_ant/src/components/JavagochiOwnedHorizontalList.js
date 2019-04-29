import React from 'react';
import { List, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';

const JavagochiOwnedHorizontalList = (props) => {

    const javagochis = props.javagochis;
    const link_start = props.link;
    console.log(link_start);

    return (
        <List
          itemLayout="horizontal"
          bordered="true"
          dataSource={javagochis}
          renderItem={javagochi => (
                <div className="hoverme">
                    <Link to={link_start + javagochi.id}>
                        <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={javagochi.race.image} />}
                          title={javagochi.nickname + " (" + javagochi.race.race + ")"}
                          description={"Health: " + javagochi.current_health * 100 / javagochi.race.max_health + "%"}
                        />
                        </List.Item>
                    </Link>
                </div>
          )}
        />
    );
}

export default JavagochiOwnedHorizontalList;
