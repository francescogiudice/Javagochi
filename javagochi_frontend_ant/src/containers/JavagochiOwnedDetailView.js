import React from 'react';
import axios from 'axios';
import { List, Avatar } from 'antd';

import JavagochiOwned from '../components/JavagochiOwned';
import Loading from '../components/Loading';

import '../styles/JcOwnedDetail.css';

class JavagochiOwnedDetail extends React.Component {

    state = {
        javagochi: {},
        items: [],
        next_level: {}
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

    reloadJavagochi() {
        const id = this.props.match.params.id;

        axios.get(`http://localhost:8000/api/javagochi/owned/${id}/`)
        .then(res => {
            this.setState({
                javagochi: res.data
            });

            const lvl = this.state.javagochi.current_level;
            axios.get(`http://localhost:8000/api/javagochi/expmap/${lvl}/`)
            .then(res => {
                this.setState({
                    next_level: res.data
                })
            })
        });
    }

    render() {
        const javagochi = this.state.javagochi;
        const items = this.state.items;
        const next_level = this.state.next_level;

        if(javagochi.nickname !== undefined && items[0] !== undefined) {
            return (
                <div>
                    <JavagochiOwned jc={javagochi} exp={next_level}/>

                    <List
                      itemLayout="horizontal"
                      bordered="true"
                      dataSource={items}
                      renderItem={item => (
                            <div className="hoverme">
                                <List.Item onClick={(e) => {
                                    e.preventDefault();
                                    const id = javagochi.id;
                                    axios.put(`http://localhost:8000/api/javagochi/owned/${id}/useitem/`, {
                                        item: item.item.name,
                                        user: item.owner.username
                                    })
                                    .then((res) => {
                                        this.reloadJavagochi();
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                                }}>
                                    <List.Item.Meta
                                      avatar={<Avatar src={item.item.image} />}
                                      title={item.item.name + "(" + item.amount_owned + ")"}
                                      description={item.item.property_modified + ": " + item.item.amount_modified}
                                    />
                                </List.Item>
                            </div>
                      )}
                    />
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

export default JavagochiOwnedDetail;
