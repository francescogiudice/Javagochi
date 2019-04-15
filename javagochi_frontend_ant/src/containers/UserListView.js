import React from 'react';
import axios from 'axios';
import UserCells from '../components/UserCells';
import { Input } from 'antd';

const Search = Input.Search;

class UserList extends React.Component {

    state = {
        users: [],
        searched: []
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/users/all')
            .then(res => {
                this.setState({
                    users: res.data,
                    searched: res.data
                });
            })
    }

    render() {
        return (
            <div>
                <Search
                  placeholder="Search..."

                  onChange={(e) => {
                      this.setState({
                          searched: []
                      });
                      var interesting = [];

                      this.state.users.forEach(function (user) {
                          if(user.username.includes(e.target.value)) {
                              interesting.push(user);
                          }
                      });

                      this.setState( {
                          searched: interesting
                      })
                  }}

                  className="test-class"

                  style={{ marginBottom: 15, width: 300 }}
                />
                <UserCells data={this.state.searched} />
            </div>
        );
    }
}

export default UserList;
