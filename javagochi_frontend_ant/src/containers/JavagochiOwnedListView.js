import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Typography, Input } from 'antd';
import JavagochiOwnedCells from '../components/JavagochiOwnedCells';
import Loading from '../components/Loading';

const { Title } = Typography;
const Search = Input.Search;

class JavagochiOwnedList extends React.Component {

    state = {
        javagochis: [],
        searched: []
    };

    config = {
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
        }
    };

    data = {};

    componentDidMount() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('username');

        if(token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            axios.get(`http://localhost:8000/api/users/${user}/javagochis/`)
                .then(res => {
                    this.setState({
                        javagochis: res.data,
                        searched: res.data
                    });
                });
        }
    }

    render() {
        const javagochis = this.state.javagochis;

        if(javagochis[0] === undefined || javagochis.length > 0) {
            return (
                <div>
                    <Search
                      placeholder="Search..."

                      onChange={(e) => {
                          this.setState({
                              searched: []
                          });
                          var interesting = [];

                          this.state.javagochis.forEach(function (javagochi) {
                              if(javagochi.race.race.includes(e.target.value) || javagochi.nickname.includes(e.target.value)) {
                                  interesting.push(javagochi);
                              }
                          });

                          this.setState( {
                              searched: interesting
                          })
                      }}

                      className="test-class"

                      style={{ marginBottom: 15, width: 300 }}
                    />
                    <Title>Your Javagochis</Title>
                    <JavagochiOwnedCells data={this.state.searched} />
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
        token: state.token
    }
}

export default connect(mapStateToProps)(JavagochiOwnedList);
