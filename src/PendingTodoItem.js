import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const PendingTodoItem = (props) => {
  const { description, completeTodoItem, index } = props;

  return (
    <ListGroup.Item onClick={() => completeTodoItem(index)} className="pending-item">
      {description}
    </ListGroup.Item>
  );
};

export default PendingTodoItem;
