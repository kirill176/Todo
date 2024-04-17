import { FC } from "react";

interface FilterTodoProps {
  setFilter: (filter: string) => void;
}

const FilterTodo: FC<FilterTodoProps> = ({ setFilter }) => {
  return (
    <>
      <div className="filter">
        <p>Filter as: </p>
        <select name="filter" id="" onChange={(e) => setFilter(e.target.value)}>
          <option value="">All todos</option>
          <option value="completed">Completed todos</option>
          <option value="not_completed">Not completed todos</option>
        </select>
      </div>
    </>
  );
};

export default FilterTodo;
