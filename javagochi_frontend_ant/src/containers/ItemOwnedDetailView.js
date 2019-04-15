import React from 'react';
import axios from 'axios';

import ItemOwnedDetail from '../components/ItemOwnedDetail';

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
        return (
            <ItemOwnedDetail data={this.state.item} />
        );
    }
}

export default ItemOwnedDetailView;
