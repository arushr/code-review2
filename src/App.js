import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import { connect } from "react-redux";

import SearchBox from "./components/SearchBox";
import DisplayBox from "./components/DisplayBox";
import SearchTag from "./components/SearchTag";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 1em;
  min-width: 720px;
  min-height: 100px;
  background-color: white;
  height: 80vh;
  overflow: scroll;
  margin-top: 100px;
  margin-left: 200px;
  margin-right: 200px;
  margin-bottom: 100px;
  transition-duration: 1.2s;
  position: relative;
  width: auto;
  border: 1px solid lightgrey;
  border-radius: 10px;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      studentData: [],
      searchText: "",
      searchTag: ""
    };
  }
  handleInput = e => {
    e.preventDefault();
    this.setState({
      searchText: e.target.value
    });
  };
  handleInputTag = e => {
    e.preventDefault();
    this.setState({
      searchTag: e.target.value
    });
  };
  componentDidMount() {
    fetch("https://www.hatchways.io/api/assessment/students")
      .then(response => response.json())
      .then(responseData => {
        this.setState({ studentData: responseData });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  }

  render() {
    const { userTag } = this.props;

    if (this.state.searchTag !== "") {
      let updatedList = userTag.filter(student => {
        if (student.name) {
          return student.name.indexOf(this.state.searchTag) !== -1;
        }
      });

      return (
        <Container>
          <SearchBox handleInput={this.handleInput} />
          <SearchTag handleInput={this.handleInputTag} />

          <DisplayBox updatedList={updatedList} />
        </Container>
      );
    }
    if (this.state.studentData.students && this.state.searchTag == "") {
      let updatedList = this.state.studentData.students.filter(student => {
        return (
          student.firstName.toLowerCase().indexOf(this.state.searchText) !==
            -1 ||
          student.lastName.toLowerCase().indexOf(this.state.searchText) !== -1
        );
      });

      return (
        <Container>
          <SearchBox handleInput={this.handleInput} />
          <SearchTag handleInput={this.handleInputTag} />
          <DisplayBox updatedList={updatedList} />
        </Container>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  userTag: state
});

export default connect(mapStateToProps)(App);
