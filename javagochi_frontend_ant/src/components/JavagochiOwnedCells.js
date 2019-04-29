import React from 'react';
import { List } from 'antd';
import JavagochiOwnedCard from './JavagochiOwnedCard';

import 'antd/dist/antd.css';

const JavagochiOwnedCells = (props) => {

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
                <List.Item key={item.race}>

                    <a href={"/myprofile/myjavagochis/" + item.id}>
                        <JavagochiOwnedCard javagochi={item}/>
                    </a>
                </List.Item>
            )}
        />
    )
}

export default JavagochiOwnedCells;
