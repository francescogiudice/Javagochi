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
        const token = localStorage.getItem('token');

        if(token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        }
        else {
            axios.defaults.headers = {
                "Content-Type": "application/json"
            }
        }

        axios.get('http://localhost:8000/api/trades/all/')
            .then(res => {
                var t = res.data.filter(function(trade) {
                    return trade.offering.owner.username !== localStorage.getItem("username");
                });
                this.setState({
                    trades: t,
                    searched: t
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
                          const offerer = trade.offering.owner.username;
                          const text = e.target.value;

                          if(jc_offered_nick.includes(text) || jc_offered_race.includes(text) || offerer.includes(text)) {
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
                <Title>All trades happening</Title>
                <TradeCells data={this.state.searched} />
            </div>
        );
    }
}

export default TradeOffersView;
