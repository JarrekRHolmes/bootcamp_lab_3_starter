import Row from "react-bootstrap/Row";
import React from "react";
import Immutable from "immutable";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  addOne(description) {
    const todo = Immutable.Map({ description: description, complete: false });
    this.setState({
      todos: [todo, ...this.state.todos],
    });
  }

  finishIt(index) {
    const todo = this.state.todos[index];
    const allTodos = this.state.todos;
    const newTodo = Immutable.Map({ description: todo.get("description"), complete: true });
    allTodos[index] = newTodo;
    this.setState({
      todos: [...allTodos],
    });
  }

  renderTodoForm() {
    let input;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.addOne(input.value);
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
  }

  render() {
    let pend = [];
    let compl = [];

    this.state.todos.map((todo, index) => {
      const isDone = todo.get("complete", false);
      debugger;
      if (!isDone) {
        pend.push(
          <ListGroup.Item
            onClick={() => this.finishIt(index)}
            className="pending-item"
          >
            {todo.get("description")}
          </ListGroup.Item>
        );
      } else {
        compl.push(
          <ListGroup.Item>
            <s>{todo.get("description")}</s>
          </ListGroup.Item>
        );
      }
    });

    return (
      <Container>
        <Row className="justify-content-center mt-2">
          <h2>Todo List</h2>
        </Row>
        <Row className="justify-content-center">{this.renderTodoForm()}</Row>
        <Row className="justify-content-center mt-3">
          {pend.length > 0 && (
            <Card style={{ width: "18rem" }} border="primary">
              <Card.Header>Pending Todos</Card.Header>
              <ListGroup>{pend}</ListGroup>
            </Card>
          )}
        </Row>
        <Row className="justify-content-center mt-2">
          {compl.length > 0 && (
            <Card style={{ width: "18rem" }} border="danger">
              <Card.Header>Completed</Card.Header>
              <ListGroup>{compl}</ListGroup>
            </Card>
          )}
        </Row>
      </Container>
    );
  }
}

export default TodoList;
