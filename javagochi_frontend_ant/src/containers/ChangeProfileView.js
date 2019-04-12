import React from 'react';
import axios from 'axios';
import { Typography, Spin } from 'antd';

import ChangeProfileForm from '../components/ChangeProfile';

const { Title } = Typography;

class ChangeProfileView extends React.Component {

    state = {
        user: {}
    }

    componentDidMount() {
        const user = localStorage.getItem('username');
        if(user != null) {
            axios.get(`http://localhost:8000/api/users/${user}/info/`)
            .then(res => {
                this.setState({
                    user: res.data
                });
            });
        }
    }

    render() {
        if(this.state.user.username !== undefined){
            return (
                <ChangeProfileForm data={this.state} />
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

export default ChangeProfileView;
