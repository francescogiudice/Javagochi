import React from 'react';
import axios from 'axios';

import JcDetail from '../components/JcDetail';

class JavagochiDetail extends React.Component {

    state = {
        javagochi: {}
    }

    componentDidMount() {
        const race = this.props.match.params.jcRace;

        axios.get(`http://localhost:8000/api/javagochi/${race}`)
        .then((res) => {
            this.setState({
                javagochi: res.data
            });
        });
    }

    render() {
        return (
            <JcDetail data={this.state} />
        );
    }
}

export default JavagochiDetail;
