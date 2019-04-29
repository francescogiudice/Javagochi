import React from 'react';
import { getItems } from '../store/actions/items';
import { connect } from 'react-redux';
import { Typography, Input } from 'antd';
import ItemCells from '../components/ItemCells';
import Loading from '../components/Loading';

import '../styles/JcList.css';

const { Title } = Typography;
const Search = Input.Search;

class ItemList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            currentlyDisplayed: []
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        const allItems = this.props.items;
        let newlyDisplayed = allItems.filter(item => item.name.includes(e.target.value));
        this.setState({
            searchTerm: e.target.value,
            currentlyDisplayed: newlyDisplayed
        });
    }

    componentDidMount() {
        this.props.dispatch(getItems());
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            searchTerm: '',
            currentlyDisplayed: newProps.items
        });
    }

    render() {
        const items = this.props.items;
        console.log(items);

        if(items[0] !== undefined) {
            return (
                <div>
                    <Search
                      placeholder="Search..."
                      onChange={this.onInputChange}
                      className="test-class"
                      style={{ marginBottom: 15, width: 300 }}
                    />
                    <Title>All items</Title>
                    <ItemCells data={this.state.currentlyDisplayed} />
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
        items: state.itemsReducer.items
    }
}

export default connect(mapStateToProps)(ItemList);
