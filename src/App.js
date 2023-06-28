import React from "react";
import uniqueString from "unique-string";
import { VisibilityToolbar, AddTodoForm, TodoList } from "./components";
import { VISIBILITY_TYPES } from "./const";
import "./App.css";

export default class App extends React.Component {
  state = {
    todos: JSON.parse(localStorage.getItem("todos")) || [],
    visibility: VISIBILITY_TYPES.ALL,
  };

  componentDidUpdate() {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  getVisibleTodos = () => {
    const { todos, visibility } = this.state;
    if (visibility === VISIBILITY_TYPES.ALL) {
      return todos;
    }

    if (visibility === VISIBILITY_TYPES.COMPLETED) {
      return todos.filter((todo) => todo.completed);
    }

    return todos.filter((todo) => !todo.completed);
  };

  handleAddTodo = (value) => {
    const { todos } = this.state;
    const newTodo = { id: uniqueString(), text: value, completed: false };

    this.setState({
      todos: [...todos, newTodo],
    });
  };

  handleToggleTodo = (id) => {
    const { todos } = this.state;
    const todo = todos.find((item) => item.id === id);

    todo.completed = !todo.completed;
    this.setState({ todos });
  };

  handleRemoveTodo = (id) => {
    const { todos } = this.state;
    const newTodos = todos.filter((todo) => todo.id !== id);

    this.setState({ todos: newTodos });
  };

  handleRemoveCompleted = () => {
    const { todos } = this.state;
    const newTodos = todos.filter((todo) => !todo.completed);

    this.setState({ todos: newTodos });
  };

  handleVisibilityChange = (visibility) => {
    this.setState({ visibility });
  };

  render() {
    const { visibility, todos } = this.state;
    const visibleTodos = this.getVisibleTodos();

    const hasCompletedTodos =
      todos.filter((todo) => !!todo.completed).length > 0;

    return (
      <div className="app">
        <h1 className="header">My tasks</h1>
        <VisibilityToolbar
          visibilityType={visibility}
          onVisibilityChange={this.handleVisibilityChange}
        />
        <div className="todo-container">
          <AddTodoForm addTodo={this.handleAddTodo} />
          <TodoList
            todos={visibleTodos}
            removeTodo={this.handleRemoveTodo}
            toggleTodo={this.handleToggleTodo}
          />
        </div>
        {hasCompletedTodos && (
          <span onClick={this.handleRemoveCompleted} className="btn-clear-all">
            Clear completed
          </span>
        )}
      </div>
    );
  }
}
