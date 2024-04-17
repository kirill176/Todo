import { useEffect, useState } from "react";
import AddTodo from "../components/AddTodo";
import { todoItem } from "../types/types";
import Todo from "../components/Todo";
import FilterTodo from "../components/FilterTodo";
import { FilterTodos } from "../utils/FilterTodos/FilterTodos";
import SearchTodo from "../components/SearchTodo";
import { SearchTodos } from "../utils/SearchTodos/SearchTodos";
import { DragEvent } from "react";

const Index = () => {
  const [todo, setTodo] = useState<todoItem[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [formShow, setFormShow] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<todoItem>();

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      setTodo(JSON.parse(todos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const addTodo = (title: string, description: string) => {
    const todoItem: todoItem = {
      id: Date.now(),
      title: title,
      description: description,
      completed: false,
    };
    setTodo([...todo, todoItem]);
  };

  const toggleCompleted = (id: number) => {
    setTodo((prevTodo) => {
      return prevTodo.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      });
    });
  };

  const removeTodo = (id: number) => {
    setTodo(todo.filter((item) => item.id !== id));
  };

  const filteredTodos: todoItem[] = FilterTodos(todo, filter);
  const searchTodos: todoItem[] =
    search.length > 0 ? SearchTodos(filteredTodos, search) : filteredTodos;

  function dropHandler(e: DragEvent<HTMLDivElement>, index: number) {
    e.preventDefault();
    const newTodo = [...todo];
    if (currentTodo) {
      if (todo.indexOf(currentTodo) !== index) {
        newTodo.splice(todo.indexOf(currentTodo), 1);
        newTodo.splice(index + 1, 0, currentTodo);
        setTodo(newTodo);
      }
    }
  }

  return (
    <>
      <AddTodo addTodo={addTodo} show={formShow} setShow={setFormShow} />
      <div className={`wrapper ${formShow ? "blur" : ""}`}>
        <h1>Todo List</h1>
        <div className="container">
          <SearchTodo setSearch={setSearch} />
          <button className="button" onClick={() => setFormShow(true)}>
            Add new Todo
          </button>
        </div>
        <FilterTodo setFilter={setFilter} />
        {search.length > 0 ? (
          <div className="cancel">
            <button onClick={() => setSearch("")}>
              Cancel search: {search}
            </button>
          </div>
        ) : null}

        {searchTodos.map((item, index) => (
          <Todo
            key={item.id}
            todo={item}
            removeTodo={removeTodo}
            toggleCompleted={toggleCompleted}
            dropHandler={dropHandler}
            setCurrentTodo={setCurrentTodo}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default Index;
