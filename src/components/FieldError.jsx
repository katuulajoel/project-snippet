import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const FieldError = ({ message }) => {
  return (
    <Wrapper>
      {message
        ? Array.isArray(message)
          ? message.map((item, idx) => {
              return <div key={idx}>{item}</div>;
            })
          : message
        : ""}
    </Wrapper>
  );
};

FieldError.propTypes = {
  message: PropTypes.string,
};

const Wrapper = styled.div`
  color: #e93232;
`;

export default FieldError;
