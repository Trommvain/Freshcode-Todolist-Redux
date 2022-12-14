import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { Formik, Field, Form, ErrorMessage } from "formik";
import styles from "./TodoList.module.scss";
import TodoListItem from "../TodoListItem/TodoListItem";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  toggleInputValidation,
} from "../../store/slices/todoSlice";

const TodoList = () => {
  const { todoItems, isInputValid, scroll } = useSelector(
    (state) => state.todo
  );
  const dispatch = useDispatch();
  const elemRef = useRef();

  const actionCreators = bindActionCreators(
    { addTodo, deleteTodo, toggleTodo, toggleInputValidation },
    dispatch
  );

  //автоскролл в конец списка при добавлении новой записи
  //scroll в стэйте меняется только при добавлении todo,
  //удаление или изменение не влияют на него
  useEffect(() => {
    const elem = elemRef.current;
    elem.scrollTop = elem.scrollHeight;
  }, [scroll]);

  const hanldeSubmit = (value, formikBag) => {
    actionCreators.addTodo(value.todoInput.trim());
    formikBag.resetForm();
  };

  const validateInput = (value) => {
    let error;
    if (!value) {
      //чтобы избежать переключения стилей при многократном
      //нажатии ADD при пустом поле
      if (isInputValid !== false) {
        actionCreators.toggleInputValidation();
      }
      error = "Write some text to add a task!";
    } else if (!isInputValid) {
      actionCreators.toggleInputValidation(); //если начинаем писать в "красном" поле стили меняются на нормальный инпут
    }
    return error;
  };

  const todoListItems = todoItems.map((item) => {
    return (
      <TodoListItem
        todoItem={item}
        key={item.id}
        deleteTodo={actionCreators.deleteTodo}
        toggleTodo={actionCreators.toggleTodo}
      />
    );
  });

  return (
    <main className={styles.container}>
      <Formik initialValues={{ todoInput: "" }} onSubmit={hanldeSubmit}>
        <Form className={styles.form}>
          <Field
            className={isInputValid ? styles.input : styles.inputError}
            type="text"
            name="todoInput"
            placeholder="What are you gonna do?"
            validate={validateInput}
            onBlur={() =>
              !isInputValid ? actionCreators.toggleInputValidation() : null
            }
          />
          <button className={styles.addBtn} type="submit">
            ADD
          </button>
          <ErrorMessage
            name="todoInput"
            component="p"
            className={styles.errorMsg}
          />
        </Form>
      </Formik>
      <section className={styles.todoBlock} ref={elemRef}>
        {todoItems.length === 0 ? (
          <p className={styles.placeholder}>There's nothing here yet...</p>
        ) : (
          todoListItems
        )}
      </section>
    </main>
  );
};

export default TodoList;
