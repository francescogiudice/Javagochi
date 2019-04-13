import React from 'react';
import axios from 'axios';
import { Input } from 'antd';
import JcOwnedCells from '../components/JcOwnedCells';

const Search = Input.Search;

class JavagochiOwnedList extends React.Component {

    state = {
        javagochis: [],
        searched: []
    }

    componentDidMount() {
        const user = localStorage.getItem('username');
        axios.get(`http://localhost:8000/api/users/${user}/javagochis/`)
            .then(res => {
                this.setState({
                    javagochis: res.data,
                    searched: res.data
                });
            });
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
                <JcOwnedCells data={this.state.searched} />
            </div>
        );
    }
}

export default JavagochiOwnedList;
