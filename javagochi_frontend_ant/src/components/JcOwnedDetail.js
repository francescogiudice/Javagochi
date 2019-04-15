import '../styles/JcOwnedDetail.css';
import React from 'react'
import axios from 'axios';
import { Typography, Spin, List, Avatar } from 'antd';

import JavagochiOwned from './JavagochiOwned';

const { Title } = Typography;

class JcOwnedDetail extends React.Component {

    state = {
        changin: false
    }

    render() {
        const javagochi = this.props.data.javagochi;
        const items = this.props.data.items;
        const next_level = this.props.data.next_level;

        return (

            <div style={{ padding: '30px' }}>
                    {
                        javagochi.race === undefined ?
                            <div>
                                <Title>Loading</Title>
                                <Spin />
                            </div>
                        :
                            <div>
                                <JavagochiOwned jc={javagochi} exp={next_level}/>

                                <div>
                                    <List
                                      itemLayout="horizontal"
                                      bordered="true"
                                      dataSource={items}
                                      renderItem={item => (
                                            <div className="hoverme">
                                                <List.Item onClick={(e) => {
                                                    e.preventDefault();
                                                    const id = javagochi.id;
                                                    axios.put(`http://localhost:8000/api/javagochi/owned/${id}/useitem/`, {
                                                        item: item.item.name,
                                                        user: localStorage.getItem('username')
                                                    })
                                                    .then((res) => {
                                                        this.props.onUpdate();
                                                    })
                                                    .catch((err) => {
                                                    });
                                                }}>
                                                    <List.Item.Meta
                                                      avatar={<Avatar src={item.item.image} />}
                                                      title={item.item.name + "(" + item.amount_owned + ")"}
                                                      description={item.item.property_modified + ": " + item.item.amount_modified}
                                                    />
                                                </List.Item>
                                            </div>
                                      )}
                                    />
                                </div>
                            </div>
                    }
            </div>
        )
    }
}

export default JcOwnedDetail;
