import React from 'react';
import axios from 'axios';
import JcOwnedCells from '../components/JcOwnedCells';
import SearchField from "react-search-field";

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
                <SearchField
                  placeholder="Search..."

                  onChange={(value, event) => {
                      this.setState({
                          searched: []
                      });
                      var interesting = [];

                      this.state.javagochis.forEach(function (javagochi) {
                          if(javagochi.race.race.includes(value) || javagochi.nickname.includes(value)) {
                              interesting.push(javagochi);
                          }
                      });

                      this.setState( {
                          searched: interesting
                      })
                  }}

                  classNames="test-class"
                />
                <JcOwnedCells data={this.state.searched} />
            </div>
        );
    }
}

export default JavagochiOwnedList;
