import { todoItem } from "../../types/types";

export const SearchTodos = (todos: todoItem[], searchTerm: string) => {
  const SearchTerm = searchTerm.toLowerCase().trim();
  const filteredTodos: todoItem[] = todos.filter((todo: todoItem) => {
    return (
      todo.title.toLowerCase().includes(SearchTerm) ||
      todo.description.toLowerCase().includes(SearchTerm)
    );
  });

  return filteredTodos;
};
