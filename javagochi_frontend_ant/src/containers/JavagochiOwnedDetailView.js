import React from 'react';
import axios from 'axios';

import JcOwnedDetail from '../components/JcOwnedDetail';

class JavagochiOwnedDetail extends React.Component {

    state = {
        javagochi: {},
        items: [],
        next_level: {}
    }

    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const user = localStorage.getItem('username');

        axios.all([
            axios.get(`http://localhost:8000/api/javagochi/owned/${id}/`),
            axios.get(`http://localhost:8000/api/users/${user}/items/`)
        ])
        .then(axios.spread((jcRes, itemRes) => {
            this.setState({
                javagochi: jcRes.data,
                items: itemRes.data
            });

            const lvl = this.state.javagochi.current_level;
            axios.get(`http://localhost:8000/api/javagochi/expmap/${lvl}/`)
            .then(res => {
                this.setState({
                    next_level: res.data
                })
            })
        }));
    }

    reload() {
        const id = this.props.match.params.id;
        const user = localStorage.getItem('username');

        axios.all([
            axios.get(`http://localhost:8000/api/javagochi/owned/${id}/`),
            axios.get(`http://localhost:8000/api/users/${user}/items/`)
        ])
        .then(axios.spread((jcRes, itemRes) => {
            console.log(jcRes.data);
            console.log(itemRes.data);
            this.setState({
                javagochi: jcRes.data,
                items: itemRes.data
            });

            const lvl = this.state.javagochi.current_level;
            axios.get(`http://localhost:8000/api/javagochi/expmap/${lvl}/`)
            .then(res => {
                this.setState({
                    next_level: res.data
                })
            })
        }));
    }

    render() {
        return (
            <JcOwnedDetail data={this.state} onUpdate={this.reload}/>
        );
    }
}

export default JavagochiOwnedDetail;
