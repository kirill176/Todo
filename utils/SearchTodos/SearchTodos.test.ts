import { describe, expect, test } from "@jest/globals";
import { SearchTodos } from "../SearchTodos/SearchTodos";
import { todoItem } from "../../types/types";

describe("SearchTodos", () => {
  const todos: todoItem[] = [
    {
      id: 1,
      title: "Buy groceries",
      description: "Go to the store",
      completed: false,
    },
    {
      id: 2,
      title: "Walk the dog",
      description: "Take Fido for a walk",
      completed: true,
    },
    {
      id: 3,
      title: "Do homework",
      description: "Finish math assignment",
      completed: false,
    },
  ];

  test("should return filtered todos when searchTerm matches todo title", () => {
    const searchTerm = "buy";
    const result = SearchTodos(todos, searchTerm);
    expect(result).toEqual([
      {
        id: 1,
        title: "Buy groceries",
        description: "Go to the store",
        completed: false,
      },
    ]);
  });

  test("should return filtered todos when searchTerm matches todo description", () => {
    const searchTerm = "walk";
    const result = SearchTodos(todos, searchTerm);
    expect(result).toEqual([
      {
        id: 2,
        title: "Walk the dog",
        description: "Take Fido for a walk",
        completed: true,
      },
    ]);
  });

  test("should return filtered todos when searchTerm matches both todo title and description", () => {
    const searchTerm = "finish";
    const result = SearchTodos(todos, searchTerm);
    expect(result).toEqual([
      {
        id: 3,
        title: "Do homework",
        description: "Finish math assignment",
        completed: false,
      },
    ]);
  });

  test("should return empty array when searchTerm does not match todo title or description", () => {
    const searchTerm = "vacation";
    const result = SearchTodos(todos, searchTerm);
    expect(result).toEqual([]);
  });
});
