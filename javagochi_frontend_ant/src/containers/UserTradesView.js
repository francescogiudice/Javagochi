import React from 'react';
import axios from 'axios';
import TradeCells from '../components/TradeCells';
import { Typography, Input } from 'antd';

const { Title } = Typography;

const Search = Input.Search;

class TradeOffersView extends React.Component {

    state = {
        trades: [],
        searched: []
    }

    componentDidMount() {
        const user = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(`http://localhost:8000/api/users/${user}/trades/`)
            .then(res => {
                this.setState({
                    trades: res.data,
                    searched: res.data
                });
            })
    }

    render() {
        return (
            <div>
                <Search
                  placeholder="Search..."

                  onChange={(e) => {
                      this.setState({
                          searched: []
                      });
                      var interesting = [];

                      this.state.trades.forEach(function (trade) {
                          const jc_offered_nick = trade.offering.nickname;
                          const jc_offered_race = trade.offering.race.race;
                          const text = e.target.value;

                          if(jc_offered_nick.includes(text) || jc_offered_race.includes(text)) {
                              interesting.push(trade);
                          }
                      });

                      this.setState( {
                          searched: interesting
                      })
                  }}

                  className="test-class"

                  style={{ marginBottom: 15, width: 300 }}
                />
                <Title>Your trades</Title>
                <TradeCells data={this.state.searched} />
            </div>
        );
    }
}

export default TradeOffersView;
