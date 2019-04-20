import React from 'react';
import { List, Card, Avatar } from 'antd';

import 'antd/dist/antd.css';

const { Meta } = Card;

const UserCells = (props) => {

    var users = props.data.filter(function(user) {
      return user.username !== localStorage.getItem("username");
    });

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
            dataSource = {users}

            renderItem={item => (
                  <List.Item key={item.username}>

                      <a href={"/profile/" + item.username}>
                          <Card
                            style={{ width: 300, height: 400 }}
                            cover={<Avatar src={item.image} style={{ width: 300, height: 300 }} />}
                            hoverable
                          >
                            <Meta
                              title={item.username}
                              description={"Level: " + item.level}
                            />
                          </Card>
                      </a>
                  </List.Item>
            )}
        />
    )
}

export default UserCells;
