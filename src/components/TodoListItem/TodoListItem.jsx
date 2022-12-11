import React from "react";
import styles from "./TodoListItem.module.scss";
import trashcanIcon from "../../assets/trash-can-icon.png";

const TodoListItem = (props) => {
  const {
    todoItem: { text, id, isDone },
    deleteTodo,
    toggleTodo,
  } = props;

  const deleteTodoHandler = () => {
    deleteTodo(id);
  };

  const toggleTodoHandler = () => {
    toggleTodo(id);
  };

  return (
    <div className={styles.todoItem}>
      <div className={styles.input}>
        <input type="checkbox" onChange={toggleTodoHandler} />
      </div>
      <p className={isDone ? styles.todoTextCrossed : styles.todoText}>
        {text}
      </p>
      <img
        className={styles.icon}
        src={trashcanIcon}
        alt="trashcan icon"
        onClick={deleteTodoHandler}
      />
    </div>
  );
};

export default TodoListItem;
