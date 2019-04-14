import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const {
  Content, Sider
} = Layout;
const { SubMenu } = Menu;

class CustomLayout extends React.Component {
    state = {
        coins: 0,
        level: 0,
    }

    render() {

        return (
            <Layout>

                {
                    this.props.isAuthenticated ?
                        <Menu
                          theme="dark"
                          mode="horizontal"
                          defaultSelectedKeys={['2']}
                          style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">
                                <Link to="/">Home</Link>
                            </Menu.Item>

                            <Menu.Item key="2" onClick={this.props.logout}>Logout</Menu.Item>
                        </Menu>
                    :
                        <Menu
                          theme="dark"
                          mode="horizontal"
                          defaultSelectedKeys={['2']}
                          style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">
                                <Link to="/">Home</Link>
                            </Menu.Item>

                            <Menu.Item key="2">
                                <Link to="/login">Login</Link>
                            </Menu.Item>
                        </Menu>
                }

                <Layout>
                    <Sider style={{ background: '#fff', width: '10%' }}>

                        <Menu
                            mode="inline"
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {
                                this.props.isAuthenticated ?
                                <SubMenu key="sub1" title={<span><Icon type="user" />{localStorage.getItem('username')}</span>}>
                                    <Menu.Item key="1"><Link to="/profile">Your Profile</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/myjavagochis">Your Javagochis</Link></Menu.Item>
                                    <Menu.Item key="3"><Link to="/myitems">Your Items</Link></Menu.Item>
                                </SubMenu>
                                :
                                <SubMenu key="sub1" title={<span><Icon type="user" />Start now!</span>}>
                                    <Menu.Item key="4"><Link to="/login">Login</Link></Menu.Item>
                                    <Menu.Item key="5"><Link to="/signup">Signup</Link></Menu.Item>
                                </SubMenu>
                            }

                            <SubMenu key="sub2" title={<span><Icon type="laptop" />Market</span>}>
                                <Menu.Item key="6"><Link to="/market">Javagochis</Link></Menu.Item>
                                <Menu.Item key="7"><Link to="/itemsmarket">Items</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>

                    <Content style={{
                        background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
