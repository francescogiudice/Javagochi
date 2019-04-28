import React from 'react';
import { getItemDetail } from '../store/actions/items';
import { buyItem } from '../store/actions/items';
import { Button, Form, InputNumber  } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ItemDetail from '../components/ItemDetail';

class ItDetail extends React.Component {

    state = {
        buying: 1
    }

    handleBuy = (e) => {
        e.preventDefault();

        const user = e.target[0].value;
        const item = e.target[1].value;
        const amount = e.target[2].value;
        this.props.dispatch(buyItem(user, item, amount));
    }

    increaseAmount = (value) => {
        this.setState({
            buying: value
        });
    }

    componentDidMount() {
        const itemName = this.props.match.params.itemName;
        this.props.dispatch(getItemDetail(itemName));
    }

    render() {
        const item = this.props.item;

        if(localStorage.getItem('username') !== undefined && localStorage.getItem('username') !== null) {
            return (
                <div>
                    <ItemDetail item={item} />

                    <Form onSubmit={this.handleBuy}>
                        <input type="hidden" id="user" name="user" value={localStorage.getItem('username')} />
                        <input type="hidden" id="race" name="race" value={item.name} />
                        <InputNumber min={1} max={99} defaultValue={1} onChange={this.increaseAmount} style={{ width: 85, marginRight: 15, marginBottom: 15 }} />
                        <Button type="primary" htmlType="submit" style={{marginLeft: 10 }}>{"Purchase (" + item.cost * this.state.buying + " coins)"}</Button>
                    </Form>
                </div>
            );
        }
        else {
            return (
                <div>
                    <ItemDetail item={this.state.item} />

                    <Button type="primary" style={{margin: 20}}><Link to="/login">Login to buy this item!</Link></Button>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        item: state.itemsReducer.selectedItem
    }
}

export default connect(mapStateToProps)(ItDetail);
