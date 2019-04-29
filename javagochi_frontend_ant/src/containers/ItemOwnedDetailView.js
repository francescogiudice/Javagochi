import React from 'react';
import { getUserItemDetail } from '../store/actions/ownedItems';
import { connect } from 'react-redux';

import ItemDetail from '../components/ItemDetail';
import Loading from '../components/Loading';

class ItemOwnedDetailView extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(getUserItemDetail(id));
    }

    render() {
        const item = this.props.item;

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

const mapStateToProps = state => {
    return {
        item: state.ownedItemsReducer.selectedItem
    }
}

export default connect(mapStateToProps)(ItemOwnedDetailView);
