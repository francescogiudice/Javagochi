import React from 'react';
import axios from 'axios';
import { Typography, Form, Input, Button, Icon } from 'antd';

const { Text } = Typography;

class ChangeProfileForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/users/${localStorage.getItem('username')}/change/`, {
            username: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        const user = this.props.data.user;
        console.log(user);
        return (
            <Form onSubmit={this.handleSubmit}>
                <Text>Change your username (currently {user.username}):</Text>
                <Input style={{ marginBottom: 15 }} placeholder="New nickname" defaultValue={user.username}/>

                <Text>Change your email (currently {user.email}):</Text>
                <Input style={{ marginBottom: 15 }} placeholder="New email" defaultValue={user.email}/>

                <Text>Change your password:</Text>
                <Input type="password" style={{ marginBottom: 15 }} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="New password"/>

                <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>Save changes</Button>
            </Form>
        );
    }
}

export default ChangeProfileForm;
