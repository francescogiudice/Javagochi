import React from 'react';
import axios from 'axios';
import JcCells from '../components/JcCell';
import { Input } from 'antd';

import '../styles/JcList.css';

const Search = Input.Search;

class JavagochiList extends React.Component {

    state = {
        javagochis: [],
        searched: []
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/javagochi/market/')
            .then(res => {
                this.setState({
                    javagochis: res.data,
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

                      this.state.javagochis.forEach(function (javagochi) {
                          if(javagochi.race.includes(e.target.value)) {
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
                <JcCells data={this.state.searched} />
            </div>
        );
    }
}

export default JavagochiList;
