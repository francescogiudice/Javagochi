import React from 'react';
import { getUser } from "../store/actions/auth";
import { getOwnedJcs } from "../store/actions/ownedJavagochi";
import { getUserItems } from '../store/actions/ownedItems';
import { connect } from 'react-redux';
import { Typography, Row, Col } from 'antd';

import Profile from '../components/Profile';
import JavagochiOwnedHorizontalList from '../components/JavagochiOwnedHorizontalList';
import ItemsOwnedHorizontalList from '../components/ItemsOwnedHorizontalList';
import Loading from '../components/Loading';

import '../styles/Intro.css';

const { Text } = Typography;

class UserDetailView extends React.Component {

  componentDidMount() {
      const user = this.props.match.params.username;
      this.props.dispatch(getUser(user));
      this.props.dispatch(getOwnedJcs(user));
      this.props.dispatch(getUserItems(user));
  }

    onClick = (item) => {
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
                            <Text>{user.username + " Javagochis"}</Text>
                            <JavagochiOwnedHorizontalList javagochis={javagochis} link={`/profile/${user.username}/javagochi/`}/>
                        </Col>

                        <Col span={8}>
                            <Text>{user.username + " items"}</Text>
                            <ItemsOwnedHorizontalList items={items} onClick={this.onClick}/>
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

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        nextUserLevel: state.userReducer.level,
        loading: state.userReducer.loading,
        javagochis: state.ownedJcReducer.ownedJcs,
        items: state.ownedItemsReducer.items
    }
}

export default connect(mapStateToProps)(UserDetailView);
