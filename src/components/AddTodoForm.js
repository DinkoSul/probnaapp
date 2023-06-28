import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

export default class AddTodoForm extends React.Component {
  state = {
    newItem: "",
  };

  ref = React.createRef();

  handleChange = (event) => {
    const newItem = event.target.value;
    this.setState({ newItem });
  };

  handleAddTodoClick = (event) => {
    event.preventDefault();

    const { newItem } = this.state;
    const { addTodo } = this.props;

    if (!newItem || !newItem.trim()) {
      return;
    }

    addTodo(newItem);

    this.setState({ newItem: "" });

    if (this.ref.current) {
      this.ref.current.focus();
    }
  };

  render() {
    const { newItem } = this.state;

    return (
      <Form>
        <InputGroup size="lg">
          <FormControl
            placeholder="Add todo"
            onChange={this.handleChange}
            value={newItem}
            autoFocus
            ref={this.ref}
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={this.handleAddTodoClick}
              type="submit"
            >
              Add
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func,
};
