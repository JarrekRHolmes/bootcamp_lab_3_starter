import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const CompletedTodoItem = (props) => {
  const { description } = props;

  return (
    <ListGroup.Item>
      <s>{description}</s>
    </ListGroup.Item>
  );
};

export default CompletedTodoItem;
