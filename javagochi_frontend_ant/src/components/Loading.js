import React from 'react'
import { Typography, Spin } from 'antd';

const { Title } = Typography;

const Loading = () => {

    return (
        <div>
            <Title>Loading</Title>
            <Spin />
        </div>
    )
}

export default Loading;
