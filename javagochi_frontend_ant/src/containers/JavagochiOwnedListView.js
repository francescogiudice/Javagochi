import React from 'react';
import { getOwnedJcs } from "../store/actions/ownedJavagochi";
import { connect } from 'react-redux';
import { Typography, Input } from 'antd';
import JavagochiOwnedCells from '../components/JavagochiOwnedCells';
import Loading from '../components/Loading';

const { Title } = Typography;
const Search = Input.Search;

class JavagochiOwnedList extends React.Component {

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
        let newlyDisplayed = allJavagochis.filter(javagochi => javagochi.race.race.includes(e.target.value) || javagochi.nickname.includes(e.target.value));
        this.setState({
            searchTerm: e.target.value,
            currentlyDisplayed: newlyDisplayed
        });
    }

    componentDidMount() {
        const user = localStorage.getItem('username');
        this.props.dispatch(getOwnedJcs(user));
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            searchTerm: '',
            currentlyDisplayed: newProps.javagochis
        });
    }

    render() {
        const javagochis = this.props.javagochis;

        if(!this.props.loading) {
            return (
                <div>
                    <Search
                      placeholder="Search..."
                      onChange={this.onInputChange}
                      className="test-class"
                      style={{ marginBottom: 15, width: 300 }}
                    />
                    <Title>Your Javagochis</Title>
                    <JavagochiOwnedCells data={this.state.currentlyDisplayed} />
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

const mapStateToProps = state => {
    return {
        javagochis: state.ownedJcReducer.ownedJcs,
        loading: state.ownedJcReducer.fetchingJavagochis
    }
}

export default connect(mapStateToProps)(JavagochiOwnedList);
