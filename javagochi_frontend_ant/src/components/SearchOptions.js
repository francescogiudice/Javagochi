import React from 'react';
import { Select } from 'antd';

class SearchInput extends React.Component {
  state = {
    data: [],
    value: undefined,
  }

  handleSearch = (value) => {
    fetch(value, data => this.setState({ data }));
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    const options = this.state.data.map(d => <Option key={d.race}>{d.race}</Option>);
    return (
      <Select
        showSearch
        value={this.state.value}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={true}
        filterOption={true}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        notFoundContent={null}
      >
        {options}
      </Select>
    );
  }
}
