import React from 'react';
import { List } from 'antd';
import JavagochiCard from './JavagochiCard';

import 'antd/dist/antd.css';

const JavagochiCells = (props) => {

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

                    <a href={"/detail/" + item.race}>
                        <JavagochiCard javagochi={item}/>
                    </a>
                </List.Item>
            )}
        />
    )
}

export default JavagochiCells;
