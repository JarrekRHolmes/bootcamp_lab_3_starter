import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import CompletedTodoItem from "./CompletedTodoItem";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import PendingTodoItem from "./PendingTodoItem";
import Row from "react-bootstrap/Row";


const TodoList = () => {
  const [pendingLists, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const addTodo = (description) => {
    setPendingTodos([description, ...pendingTodos]);
  };

  const completeTodoItem = (index) => {
    const completedItem = pendingTodos.splice(index, 1);
    setCompletedTodos([...completedItem, ...completedTodos]);
    setPendingTodos([...pendingTodos]);
  };

  const renderTodoForm = () => {
    let input;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(input.value);
          input.value = "";
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
          placeholder="add task"
        />
      </form>
    );
  };

  const renderPendingTodos = () => {
    const pendingTodoList = pendingTodos.map((todo, index) => {
      return (
        <PendingTodoItem
          description={todo}
          completeTodoItem={completeTodoItem}
          index={index}
          key={index}
        />
      );
    });

    return (
      <>
        {pendingTodoList.length > 0 && (
          <Card style={{ width: "18rem" }} border="primary">
            <Card.Header>Pending Todos</Card.Header>
            <ListGroup>{pendingTodoList}</ListGroup>
          </Card>
        )}
      </>
    );
  };

  const renderCompletedTodos = () => {
    const completedTodoList = completedTodos.map((todo, index) => {
      return <CompletedTodoItem description={todo} key={index} />;
    });

    return (
      <>
        {completedTodoList.length > 0 && (
          <Card style={{ width: "18rem" }} border="danger">
            <Card.Header>Completed</Card.Header>
            <ListGroup>{completedTodoList}</ListGroup>
          </Card>
        )}
      </>
    );
  };

  return (
    <Container>
      <Row className="justify-content-center mt-2">
        <h2>Todo List</h2>
      </Row>
      <Row className="justify-content-center">{renderTodoForm()}</Row>
      <Row className="justify-content-center mt-3">{renderPendingTodos()}</Row>
      <Row className="justify-content-center mt-2">{renderCompletedTodos()}</Row>
    </Container>
  );
};

export default TodoList;
