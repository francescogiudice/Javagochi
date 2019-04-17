import React from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

import Profile from '../components/Profile';
import JavagochiOwnedHorizontalList from '../components/JavagochiOwnedHorizontalList';
import ItemsOwnedHorizontalList from '../components/ItemsOwnedHorizontalList';
import Loading from '../components/Loading';

import '../styles/Intro.css';

class PersonalProfileView extends React.Component {

    state = {
        user: {},
        javagochis: [],
        items: [],
        next_level: {}
    }

    componentDidMount() {
        const user = localStorage.getItem('username');
        if(user != null) {
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
            console.log("Inside if: " + user.username);
            return (
                <div style={{ padding: '30px' }}>
                    <Profile user={user} next_level={next_level}/>

                    <Row gutter={16}>
                        <Col span={8}>
                            <JavagochiOwnedHorizontalList javagochis={javagochis} link="myjavagochis/"/>
                        </Col>

                        <Col span={8}>
                            <ItemsOwnedHorizontalList items={items} />
                        </Col>
                    </Row>

                    <Button type="primary" style={{margin: 20}}><Link to="/profile/change">Change info</Link></Button>
                </div>
            );
        }
        else {
            console.log("Inside else: " + user.username);
            return (
                <Loading />
            );
        }
    }
}

export default PersonalProfileView;
