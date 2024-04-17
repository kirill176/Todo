import { DragEvent, FC, useState } from "react";
import { todoItem } from "../types/types";
import { useRouter } from "next/router";

interface TodoItemProps {
  todo: todoItem;
  removeTodo: (id: number) => void;
  toggleCompleted: (id: number) => void;
  dropHandler: (e: DragEvent<HTMLDivElement>, index: number) => void;
  setCurrentTodo: (currentCard: todoItem) => void;
  index: number;
}

const Todo: FC<TodoItemProps> = ({
  todo,
  removeTodo,
  toggleCompleted,
  dropHandler,
  setCurrentTodo,
  index,
}) => {
  const router = useRouter();

  const goToTodoDetails = () => {
    router.push(`/todo-details/${todo.id}`);
  };
  function dragStartHandler(e: DragEvent<HTMLDivElement>, todo: todoItem) {
    setCurrentTodo(todo);
    console.log(todo);
  }

  return (
    <div
      className="todo"
      draggable={true}
      onDragStart={(e) => {
        dragStartHandler(e, todo);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        dropHandler(e, index);
      }}
    >
      <div className="todo-text">
        <p> {todo.title}</p>
      </div>

      <div className="todo-items">
        <div className="todo-status">
          <p className="status">Status:</p>
          <input
            name="checkbox"
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => toggleCompleted(todo.id)}
          />
          <p>{todo.completed ? "Completed" : "Not completed"}</p>
        </div>
        <div className="todo-buttons">
          <button className="todo-details" onClick={goToTodoDetails}>
            Details
          </button>
          <button className="todo-remove" onClick={() => removeTodo(todo.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
