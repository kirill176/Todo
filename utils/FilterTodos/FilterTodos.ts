import { todoItem } from "../../types/types";

export const FilterTodos = (todos: todoItem[], filter: string) => {
  const filteredTodos: todoItem[] = todos.filter((todo: todoItem) => {
    if (filter === "completed") {
      return todo.completed;
    } else if (filter === "not_completed") {
      return !todo.completed;
    } else {
      return true;
    }
  });

  return filteredTodos;
};
