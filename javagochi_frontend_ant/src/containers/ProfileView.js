import React from 'react';
import axios from 'axios';

import Profile from '../components/Profile';
import Intro from '../components/Intro';

import '../styles/Intro.css';

class ProfileView extends React.Component {

    state = {
        user: {},
        javagochis: [],
        items: [],
        next_level: {}
    }

    componentDidMount() {
        const user = this.props.match.params.username;
        if(user != null) {
            axios.all([
                axios.get(`http://localhost:8000/api/users/${user}/info/`),
                axios.get(`http://localhost:8000/api/users/${user}/javagochis/`),
                axios.get(`http://localhost:8000/api/users/${user}/items/`)
            ])
            .then(axios.spread((resInfo, resJc, resItems) => {
                this.setState({
                    user: resInfo.data,
                    javagochis: resJc.data,
                    items: resItems.data
                });

                const lvl = resInfo.data.level;
                axios.get(`http://localhost:8000/api/users/expmap/${lvl}/`)
                .then(res => {
                    this.setState({
                        next_level: res.data
                    })
                });
            }));
        }
    }

    render() {
        if(this.state.user.username !== undefined){
            return (
                <Profile data={this.state} />
            );
        }
        else {
            return (
                <Intro />
            );
        }
    }
}

export default ProfileView;
