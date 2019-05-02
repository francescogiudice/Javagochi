import React from 'react';
import { getUser } from "../store/actions/auth";
import { connect } from 'react-redux';
import { Typography, Spin } from 'antd';

import ChangeProfileForm from '../components/ChangeProfile';

const { Title } = Typography;

class ChangeProfileView extends React.Component {

    componentDidMount() {
        const user = localStorage.getItem('username');
        this.props.dispatch(getUser(user));
    }

    render() {
        if(this.props.user.username !== undefined){
            return (
                <ChangeProfileForm data={this.props} />
            );
        }
        else {
            return (
                <div>
                    <Title>Loading</Title>
                    <Spin />
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        loading: state.userReducer.loading
    }
}

export default connect(mapStateToProps)(ChangeProfileView);
