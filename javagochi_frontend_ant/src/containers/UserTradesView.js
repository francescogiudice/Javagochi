import React from 'react';
import { getAllUserTrades } from '../store/actions/trades';
import { connect } from 'react-redux';
import TradeCells from '../components/TradeCells';
import { Typography, Input } from 'antd';
import Loading from '../components/Loading';

const { Title } = Typography;

const Search = Input.Search;

class TradeOffersView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            currentlyDisplayed: []
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        const allUserTrades = this.props.trades;
        let newlyDisplayed = allUserTrades.filter(trade => trade.offering.race.race.includes(e.target.value));
        this.setState({
            searchTerm: e.target.value,
            currentlyDisplayed: newlyDisplayed
        });
    }

    componentDidMount() {
      const user = localStorage.getItem('username');
      this.props.dispatch(getAllUserTrades(user));
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            searchTerm: '',
            currentlyDisplayed: newProps.trades
        });
    }

    render() {
        const trades = this.props.trades;
        const loading = this.props.loading;

        return (
            <div>
                <Search
                  placeholder="Search..."
                  onChange={this.onInputChange}
                  className="test-class"
                  style={{ marginBottom: 15, width: 300 }}
                />
                <Title>Your trades</Title>
                <TradeCells data={this.state.currentlyDisplayed} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      trades: state.tradesReducer.userTrades,
      loading: state.tradesReducer.fetchingUserTrades
    }
}

export default connect(mapStateToProps)(TradeOffersView);
