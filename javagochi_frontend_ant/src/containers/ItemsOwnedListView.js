import React from 'react';
import axios from 'axios';
import { Input } from 'antd';
import ItemOwnedCells from '../components/ItemOwnedCells';
import Loading from '../components/Loading';

const Search = Input.Search;

class ItemsOwnedList extends React.Component {

    state = {
        items: [],
        searched: []
    }

    componentDidMount() {
        const user = localStorage.getItem('username');
        axios.get(`http://localhost:8000/api/users/${user}/items/`)
            .then(res => {
                this.setState({
                    items: res.data,
                    searched: res.data
                });
            });
    }

    render() {
        const items = this.state.items;

        if(items[0] !== undefined || items.length > 0) {
            return (
                <div>
                    <Search
                      placeholder="Search..."

                      onChange={(e) => {
                          this.setState({
                              searched: []
                          });
                          var interesting = [];

                          this.state.items.forEach(function (item) {
                              if(item.item.name.includes(e.target.value)) {
                                  interesting.push(item);
                              }
                          });

                          this.setState( {
                              searched: interesting
                          })
                      }}

                      className="test-class"

                      style={{ marginBottom: 15, width: 300 }}
                    />
                    <ItemOwnedCells data={this.state.searched} />
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

export default ItemsOwnedList;
