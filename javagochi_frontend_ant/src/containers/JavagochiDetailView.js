import React from 'react';
import axios from 'axios';

import JcDetail from '../components/JcDetail';

class JavagochiDetail extends React.Component {

    state = {
        user: {},
        javagochi: {}
    }

    componentDidMount() {
        const user = localStorage.getItem('username');
        const race = this.props.match.params.jcRace;
        axios.all([
          axios.get(`http://localhost:8000/api/users/${user}/info/`),
          axios.get(`http://localhost:8000/api/javagochi/${race}`)
        ])
        .then(axios.spread((resInfo, resJc) => {
            this.setState({
                user: resInfo.data,
                javagochi: resJc.data
            });
        }));
    }

    render() {
        return (
            <JcDetail data={this.state} />
        );
    }
}

export default JavagochiDetail;
