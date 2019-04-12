import React from 'react';
import axios from 'axios';

import ItemDetail from '../components/ItemDetail';

class ItDetail extends React.Component {

    state = {
        item: {}
    }

    componentDidMount() {
        const itemName = this.props.match.params.itemName;
        axios.get(`http://localhost:8000/api/items/${itemName}`)
            .then(res => {
                this.setState({
                    item: res.data
                });
            });
    }

    render() {
        return (
            <ItemDetail data={this.state.item} />
        );
    }
}

export default ItDetail;
