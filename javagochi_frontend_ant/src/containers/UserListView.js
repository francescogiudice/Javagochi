import React from 'react';
import { getUsers } from '../store/actions/auth';
import { connect } from 'react-redux';
import UserCells from '../components/UserCells';
import { Typography, Input } from 'antd';
import Loading from '../components/Loading';

const { Title } = Typography;
const Search = Input.Search;

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            currentlyDisplayed: []
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        const allUsers = this.props.users;
        let newlyDisplayed = allUsers.filter(user => user.username.includes(e.target.value));
        this.setState({
            searchTerm: e.target.value,
            currentlyDisplayed: newlyDisplayed
        });
    }

    componentDidMount() {
        const user = localStorage.getItem('username');
        this.props.dispatch(getUsers(user));
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            searchTerm: '',
            currentlyDisplayed: newProps.users
        });
    }

    render() {
        // const users = this.props.users;
        const loading = this.props.loading;

        if(!loading) {
            return (
                <div>
                    <Search
                      placeholder="Search..."
                      onChange={this.onInputChange}
                      className="test-class"
                      style={{ marginBottom: 15, width: 300 }}
                    />
                    <Title>Other people</Title>
                    <UserCells data={this.state.currentlyDisplayed} />
                </div>
            );
        }
        else {
            return (
                <Loading />
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        users: state.userReducer.users,
        loading: state.userReducer.fetchingUsers
    }
}

export default connect(mapStateToProps)(UserList);
