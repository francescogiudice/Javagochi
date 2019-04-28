import React from 'react';
import { getUser } from "../store/actions/auth";
import { getOwnedJcs } from "../store/actions/ownedJavagochi";
import { getUserItems } from '../store/actions/ownedItems';
import { connect } from 'react-redux';
import { Typography, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

import Profile from '../components/Profile';
import JavagochiOwnedHorizontalList from '../components/JavagochiOwnedHorizontalList';
import ItemsOwnedHorizontalList from '../components/ItemsOwnedHorizontalList';
import Loading from '../components/Loading';

import '../styles/Intro.css';

const { Text } = Typography;

class PersonalProfileView extends React.Component {

    componentDidMount() {
        const user = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        this.props.dispatch(getUser(user));
        this.props.dispatch(getOwnedJcs(user));
        this.props.dispatch(getUserItems(user));
    }

    onClick = (item) => {
        this.props.history.push('/myitems/' + item.id)
    }

    render() {
        const user = this.props.user;
        const javagochis = this.props.javagochis;
        const items = this.props.items;
        const nextUserLevel = this.props.nextUserLevel;

        if(user.username !== undefined){
            return (
                <div style={{ padding: '30px' }}>
                    <Profile user={user} next_level={nextUserLevel}/>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Text>Your Javagochis</Text>
                            <JavagochiOwnedHorizontalList javagochis={javagochis} link="myjavagochis/"/>
                        </Col>

                        <Col span={8}>
                            <Text>Your items</Text>
                            <ItemsOwnedHorizontalList items={items} onClick={this.onClick}/>
                        </Col>
                    </Row>

                    <Button type="primary" style={{margin: 20}}><Link to="/myprofile/change">Change info</Link></Button>
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

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        nextUserLevel: state.userReducer.level,
        loading: state.userReducer.loading,
        javagochis: state.ownedJcReducer.ownedJcs,
        items: state.ownedItemsReducer.items
    }
}

export default connect(mapStateToProps)(PersonalProfileView);
