import React from 'react';
import { Typography, Form, Input, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { withRouter } from 'react-router-dom';

const { Title } = Typography;

class ChangeProfileForm extends React.Component {
    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onChange(
                  values.userName,
                  values.email,
                  values.password
                );
            }
            this.props.history.push('/profile');
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        }
        else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const user = this.props.data.user;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Title>Change your user informations!</Title>

                <Form onSubmit={this.handleSubmit}>

                    <Form.Item>
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                        initialValue: user.username,
                      })(
                          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="New username"/>
                      )}
                    </Form.Item>

                    <Form.Item>
                      {getFieldDecorator('email', {
                        rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                        },
                        {
                          required: true, message: 'Please input your E-mail!',
                        }],
                        initialValue: user.email,
                      })(
                          <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="New e-mail" />
                      )}
                    </Form.Item>

                    <Form.Item label="Password">
                      {getFieldDecorator('password', {
                      rules: [],
                      })(
                          <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="New password" />
                      )}
                    </Form.Item>

                    <Form.Item label="Confirm Password">
                      {getFieldDecorator('confirm', {
                      rules: [{
                      required: false, message: 'Please confirm your password!',
                      }, {
                      validator: this.compareToFirstPassword,
                      }],
                      })(
                          <Input type="password" onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Repeat new password"/>
                      )}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>Save changes</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedChangeProfileForm = Form.create({ name: 'change' })(ChangeProfileForm);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChange: (username, email, password) => dispatch(actions.authChangeProfile(localStorage.getItem('username'), username, email, password))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedChangeProfileForm));
