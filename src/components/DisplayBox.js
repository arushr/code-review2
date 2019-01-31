import React from "react";
import styled from "styled-components";

import SingleItem from "./SingleItem";

const DisplayContainer = styled.div`
  display: flex;
`;
const DisplayBox = ({ updatedList }) => {
  if (updatedList) {
    return (
      <DisplayContainer>
        <SingleItem updatedList={updatedList} />
      </DisplayContainer>
    );
  } else {
    return null;
  }
};

export default DisplayBox;
