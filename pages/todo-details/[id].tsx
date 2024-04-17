import { useEffect, useState } from "react";
import { todoItem } from "../../types/types";
import { useRouter } from "next/router";

export default function ({ id }: { id: number }) {
  const [todo, setTodo] = useState<todoItem | null>(null);
  const router = useRouter();
  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      const parsedTodos = JSON.parse(todos);
      const filterTodos = parsedTodos.find((todo: todoItem) => todo.id == id);

      if (filterTodos) {
        setTodo(filterTodos);
      } else {
        router.push("/error-page");
      }
    } else {
      router.push("/error-page");
    }
  }, [id]);

  const handleBackClick = () => {
    router.back();
  };

  return (
    <>
      <div className="details">
        <button className="details-back" onClick={handleBackClick}>
          Turn back
        </button>
        <div className="details-content">
          <h6>{todo?.title}</h6>
          <p>{todo?.description}</p>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { id: number };
}): Promise<{ props: { id: number } }> {
  const { id } = params;
  return { props: { id } };
}
