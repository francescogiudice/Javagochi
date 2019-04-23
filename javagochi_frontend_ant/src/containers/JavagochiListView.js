import React from 'react';
import { connect } from "react-redux";
import { getJcRaces } from "../store/actions/javagochi";

import { Typography, Input } from 'antd';
import JavagochiCells from '../components/JavagochiCells';
import Loading from '../components/Loading';

import '../styles/JcList.css';

const { Title } = Typography;
const Search = Input.Search;

class JavagochiList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            currentlyDisplayed: []
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        const allJavagochis = this.props.javagochis;
        let newlyDisplayed = allJavagochis.filter(javagochi => javagochi.race.includes(e.target.value));
        this.setState({
            searchTerm: e.target.value,
            currentlyDisplayed: newlyDisplayed
        });
    }

    componentDidMount() {
        this.props.dispatch(getJcRaces());
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps.javagochis);
        this.setState({
            searchTerm: '',
            currentlyDisplayed: newProps.javagochis
        });
    }

    render() {
        const javagochis = this.props.javagochis;
        const loading = this.props.loading;

        if(!loading) {
            return (
                <div>
                    <Search
                      placeholder="Search..."

                      onChange={this.onInputChange}

                      className="test-class"

                      style={{ marginBottom: 15, width: 300 }}
                    />
                    <Title>All Javagochis</Title>
                    <JavagochiCells data={this.state.currentlyDisplayed} />
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

function mapStateToProps(state) {
    return {
        javagochis: state.jcReducer.jcRaces,
        loading: state.jcReducer.fetchingRaces,
        error: state.jcReducer.jcError
    }
}

export default connect(mapStateToProps)(JavagochiList);
