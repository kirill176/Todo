import { FC, useState } from "react";

interface SearchTodoProps {
  setSearch: (value: string) => void;
}

const SearchTodo: FC<SearchTodoProps> = ({ setSearch }) => {
  const [value, setValue] = useState("");

  const search = () => {
    setSearch(value);
    setValue("");
  };

  return (
    <div className="input">
      <input
        type="text"
        name="title"
        value={value}
        placeholder="Search todo..."
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={search}>Search Todo</button>
    </div>
  );
};
export default SearchTodo;
