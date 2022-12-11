import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const initialState = {
  todoItems: [],
  isInputValid: true, // для изменения стилей инпута при валидации
  scroll: false, //для автоскролла в конец todoList
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todoItem = {
        id: uuidv4(),
        text: action.payload,
        isDone: false,
      };
      state.todoItems = [...state.todoItems, todoItem];
      state.scroll = !state.scroll;
    },
    deleteTodo: (state, action) => {
      state.todoItems = state.todoItems.filter(
        (item) => item.id !== action.payload
      );
    },
    toggleTodo: (state, action) => {
      state.todoItems = state.todoItems.map((item) => ({
        ...item,
        isDone: item.id === action.payload ? !item.isDone : item.isDone,
      }));
    },
    toggleInputValidation: (state) => {
      state.isInputValid = !state.isInputValid;
    },
  },
});

const { reducer, actions } = todoSlice;

const { addTodo, deleteTodo, toggleTodo, toggleInputValidation } = actions;

export { addTodo, deleteTodo, toggleTodo, toggleInputValidation };
export default reducer;
