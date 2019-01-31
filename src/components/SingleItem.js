import React from "react";
import styled from "styled-components";
import * as UserActionCreator from "../actions/user";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
const InputDiv = styled.div`
  display: flex;
  justify-content: sapce-between;
`;
const SingleItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
const ItemList = styled.ul`
  display: flex;
  width: 100%;
  border-bottom: 1px solid lightgrey;
  justify-content: space-between;
`;
const Picture = styled.img`
  border-radius: 50%;
  border: 1px solid lightgrey;
`;
const Information = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const Details = styled.div`
  margin-left: 20px;
`;

const Name = styled.h1`
  margin: 0;
`;
const MoreDetails = styled.div`
  padding-left: 20px;
  color: grey;
`;
const ExpandableView = styled.input`
  padding: 20px;
  height: 30px;
  outline: none;
`;
const AddTag = styled.input`
  outline: none;
  border: 0px none;
  border-bottom: 1px solid grey;
  margin-bottom: 10px;

  ::placeholder {
    color: grey;
    padding: 12px;

    font-size: 14px;
  }
`;
class SingleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedView: false,
      selectedIndex: -1,
      tag: ""
    };
    this.clicked = this.clicked.bind(this);
  }

  indiviualAverage = () => {
    const { expandedView } = this.state;

    if (expandedView) {
      return <p>It Works</p>;
    }
    return null;
  };
  clicked() {
    this.setState({
      expandedView: true
    });
  }
  expandableView = () => {
    if (true) {
      return (
        <ExpandableView
          type="image"
          src="http://www.clker.com/cliparts/o/9/x/P/X/L/plus-hi.png"
          alt="plus sign"
          onClick={this.selectIndivisual}
        />
      );
    }
  };
  average = grades => {
    let total = 0;
    for (var i = 0; i < grades.length; i++) {
      total += parseInt(grades[i], 10);
    }

    var average = total / grades.length;
    return average;
  };

  render() {
    const { dispatch, userTag } = this.props;

    const addUserTag = bindActionCreators(
      UserActionCreator.addUserTag,
      dispatch
    );
    const { selectedIndex } = this.state;
    const results = this.props.updatedList;

    const tagOnChange = e => {
      e.preventDefault();
      this.setState({
        tag: e.target.value
      });
    };

    const tagOnSubmithandler = (e, index, data) => {
      e.preventDefault();
      addUserTag(this.state.tag, index, data);
      e.currentTarget.reset();
    };

    const selectIndivisual = index => {
      if (index !== -1) {
        this.setState({
          selectedIndex: index
        });
      }
    };
    const deSelectIndivisual = () => {
      this.setState({
        selectedIndex: -1
      });
    };

    let studentData = results.map((data, index) => (
      <ItemList key={data.id}>
        <Information>
          <Picture height="100" width="100" src={data.pic} alt="studentData" />
          <Details>
            <Name>
              {data.firstName.toUpperCase()} {data.lastName.toUpperCase()}
            </Name>
            <MoreDetails>
              <p>Email: {data.email}</p> <p>Company: {data.company}</p>
              <p>Skill: {data.skill}</p>
              <p>Average: {this.average(data.grades)}%</p>
              {selectedIndex === index ? (
                <div>
                  {data.grades.map((grade, index) => (
                    <div key={index}>
                      <p>
                        Test{index + 1}: &emsp;
                        {grade}%
                      </p>
                    </div>
                  ))}
                  {userTag.map(({ name, currentIndex }) => (
                    <InputDiv>
                      {currentIndex === index ? (
                        <input
                          style={{
                            backgroundColor: "lightgrey",
                            borderRadius: "5px",
                            color: "black",
                            padding: "10px"
                          }}
                          type="button"
                          value={name}
                        />
                      ) : null}
                    </InputDiv>
                  ))}

                  <form onSubmit={e => tagOnSubmithandler(e, index, data)}>
                    <AddTag
                      type="text"
                      onChange={tagOnChange}
                      placeholder="Add a Tag"
                    />
                  </form>
                </div>
              ) : null}
            </MoreDetails>
          </Details>
        </Information>
        {selectedIndex === index ? (
          <ExpandableView
            type="image"
            src="https://www.emoji.co.uk/files/twitter-emojis/symbols-twitter/11231-heavy-minus-sign.png"
            alt="plus sign"
            onClick={() => deSelectIndivisual()}
          />
        ) : (
          <ExpandableView
            type="image"
            src="http://www.clker.com/cliparts/o/9/x/P/X/L/plus-hi.png"
            alt="plus sign"
            onClick={() => selectIndivisual(index)}
          />
        )}
      </ItemList>
    ));

    return <SingleItemContainer>{studentData}</SingleItemContainer>;
  }
}
const mapStateToProps = state => ({
  userTag: state
});

export default connect(mapStateToProps)(SingleItem);
