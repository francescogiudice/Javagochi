import React from 'react';
import axios from 'axios';
import ItemCells from '../components/ItemCells';
import SearchField from "react-search-field";

import '../styles/JcList.css';

class ItemList extends React.Component {

    state = {
        items: [],
        searched: []
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/items/market')
            .then(res => {
                this.setState({
                    items: res.data,
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

                      this.state.items.forEach(function (item) {
                          if(item.name.includes(value)) {
                              interesting.push(item);
                          }
                      });

                      this.setState( {
                          searched: interesting
                      })
                  }}

                  classNames="test-class"
                />
                <ItemCells data={this.state.searched} />
            </div>
        );
    }
}

export default ItemList;
