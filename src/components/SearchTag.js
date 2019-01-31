import React, { Component } from "react";

import styled from "styled-components";

const SearchTagContainer = styled.div`
  width: 100%;
  display: flex;

  min-height: 40px;
  border-bottom: 1px solid grey;
`;
const Search = styled.input`
  width: 100%;
  border: none;
  border-color: transparent;
  height: 50px;
  max-height: 10px;
  padding: 10px;
  margin: 8px 0;
  font-size: 15px;
  color: black;
  outline: none;
  right: 10px;

  ::placeholder {
    color: grey;
    font-size: 1.3em;
    font-style: italic;
  }
`;

class SearchTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.searchText);
    e.currentTarget.reset();
  };
  render() {
    return (
      <SearchTagContainer>
        <Search
          type="text"
          placeholder="Search By Tag"
          onChange={e => this.props.handleInput(e)}
        />
      </SearchTagContainer>
    );
  }
}

export default SearchTag;
