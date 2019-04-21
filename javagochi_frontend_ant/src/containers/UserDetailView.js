import React from 'react';
import axios from 'axios';
import { Typography, Row, Col } from 'antd';

import Profile from '../components/Profile';
import JavagochiOwnedHorizontalList from '../components/JavagochiOwnedHorizontalList';
import ItemsOwnedHorizontalList from '../components/ItemsOwnedHorizontalList';
import Loading from '../components/Loading';

import '../styles/Intro.css';

const { Text } = Typography;

class UserDetailView extends React.Component {

    state = {
        user: {},
        javagochis: [],
        items: [],
        next_level: {}
    }

    clickedItem = (item) => {
        console.log(item);
    }

    componentDidMount() {
        const user = this.props.match.params.username;
        const token = localStorage.getItem('token');

        if(user != null) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }

            axios.all([
                axios.get(`http://localhost:8000/api/users/${user}/info/`),
                axios.get(`http://localhost:8000/api/users/${user}/javagochis/`),
                axios.get(`http://localhost:8000/api/users/${user}/items/`)
            ])
            .then(axios.spread((resInfo, resJc, resItems) => {
                this.setState({
                    user: resInfo.data,
                    javagochis: resJc.data,
                    items: resItems.data
                });

                const lvl = resInfo.data.level;
                axios.get(`http://localhost:8000/api/users/expmap/${lvl}/`)
                .then(res => {
                    this.setState({
                        next_level: res.data
                    })
                });
            }));
        }
    }

    render() {
        const user = this.state.user;
        const javagochis = this.state.javagochis;
        const items = this.state.items;
        const next_level = this.state.next_level;

        if(user.username !== undefined && next_level.exp_for_next_level !== undefined){
            return (
                <div style={{ padding: '30px' }}>
                    <Profile user={user} next_level={next_level}/>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Text>{user.username + " Javagochis"}</Text>
                            <JavagochiOwnedHorizontalList javagochis={javagochis} link={`/profile/${user.username}/javagochi/`}/>
                        </Col>

                        <Col span={8}>
                            <Text>{user.username + " items"}</Text>
                            <ItemsOwnedHorizontalList items={items} onClick={this.clickedItem}/>
                        </Col>
                    </Row>
                </div>
            );
        }
            else {
            return (
                <Loading />
            );
        }
    }
}

export default UserDetailView;
