import React from 'react';
import { Typography } from 'antd';
import JavagochiOwned from './JavagochiOwned';
import JavagochiRace from './JavagochiRace';

const { Title } = Typography;

class TradeDetail extends React.Component {

    render() {
        const trade = this.props.data.trade;
        const next_level = this.props.data.next_level;

        const jc_offered = trade.offering;
        const trade_for = trade.interested_into;
        return (

            <div style={{ padding: '30px' }}>
                <JavagochiOwned jc={jc_offered} exp={next_level}/>

                <Title>For</Title>

                <JavagochiRace javagochi={trade_for}/>
            </div>
        )
    }
}

export default TradeDetail;
