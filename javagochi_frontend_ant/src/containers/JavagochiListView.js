import React from 'react';
import axios from 'axios';
import JcCells from '../components/JcCell';
import SearchField from "react-search-field";

import '../styles/JcList.css';

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
                <SearchField
                  placeholder="Search..."

                  onChange={(value, event) => {
                      this.setState({
                          searched: []
                      });
                      var interesting = [];

                      this.state.javagochis.forEach(function (javagochi) {
                          if(javagochi.race.includes(value)) {
                              interesting.push(javagochi);
                          }
                      });

                      this.setState( {
                          searched: interesting
                      })
                  }}

                  classNames="test-class"
                />
                <JcCells data={this.state.searched} />
            </div>
        );
    }
}

export default JavagochiList;
