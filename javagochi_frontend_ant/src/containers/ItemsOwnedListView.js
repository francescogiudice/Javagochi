import React from 'react';
import { getUserItems } from '../store/actions/ownedItems';
import { connect } from 'react-redux';
import { Typography, Input } from 'antd';
import ItemOwnedCells from '../components/ItemOwnedCells';
import Loading from '../components/Loading';

const { Title } = Typography;
const Search = Input.Search;

class ItemsOwnedList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            currentlyDisplayed: []
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        const allOwnedItems = this.props.items;
        let newlyDisplayed = allOwnedItems.filter(item => item.item.name.includes(e.target.value));
        this.setState({
            searchTerm: e.target.value,
            currentlyDisplayed: newlyDisplayed
        });
    }

    componentDidMount() {
        const user = localStorage.getItem('username');
        this.props.dispatch(getUserItems(user));
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            searchTerm: '',
            currentlyDisplayed: newProps.items
        });
    }

    render() {
        const items = this.props.items;
        const loading = this.props.loading;

        if(!loading) {
            return (
                <div>
                    <Search
                      placeholder="Search..."
                      onChange={this.onInputChange}
                      className="test-class"
                      style={{ marginBottom: 15, width: 300 }}
                    />
                    <Title>Your items</Title>
                    <ItemOwnedCells data={this.state.currentlyDisplayed} />
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

const mapStateToProps = state => {
    return {
        items: state.ownedItemsReducer.items,
        loading: state.ownedItemsReducer.fetchingItems
    }
}


export default connect(mapStateToProps)(ItemsOwnedList);
