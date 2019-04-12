import React from 'react';
import axios from 'axios';
import ItemOwnedCells from '../components/ItemOwnedCells';
import SearchField from "react-search-field";

class OwnedItemsList extends React.Component {

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
                          if(item.item.name.includes(value)) {
                              interesting.push(item);
                          }
                      });

                      this.setState( {
                          searched: interesting
                      })
                  }}

                  classNames="test-class"
                />
                <ItemOwnedCells data={this.state.searched} />
            </div>
        );
    }
}

export default OwnedItemsList;
