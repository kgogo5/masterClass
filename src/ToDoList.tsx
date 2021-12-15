import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";

const Wrap = styled.div`
  padding: 2em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  & ul {
    margin: 1em 0;
    padding: 0;

    & li {
      list-style: none;
    }
  }

  & * + * {
    margin-top: 0.5em;
  }
`;

const ToDoList = () => {
  const [category, setCategory] = useRecoilState(categoryState);
  const toDos = useRecoilValue(toDoSelector);

  const onInput = (event: any) => {
    setCategory(event.target.value);
  };

  return (
    <Wrap>
      <div>
        <h1>To Dos</h1>
        <hr />
      </div>
      <select value={category} onInput={(e) => onInput(e)}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </Wrap>
  );
};

export default ToDoList;
