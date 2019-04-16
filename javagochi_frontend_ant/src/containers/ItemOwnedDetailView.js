import React from 'react';
import axios from 'axios';

import ItemDetail from '../components/ItemDetail';
import Loading from '../components/Loading';

class ItemOwnedDetailView extends React.Component {

    state = {
        item: {}
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get(`http://localhost:8000/api/items/owned/${id}/`)
            .then(res => {
                this.setState({
                    item: res.data
                });
            });
    }

    render() {
        const item = this.state.item;

        if(item.item !== undefined) {
            return (
                <div>
                    <ItemDetail item={item.item} />
                    <p>{"You own: " + item.amount_owned}</p>
                </div>
            );
        }
        else {
            return (
                <Loading />
            );
        }
    }
}

export default ItemOwnedDetailView;
