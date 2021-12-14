import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "./atoms";

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((prev) => {
      const targetIndex = prev.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      return [
        ...prev.slice(0, targetIndex),
        newToDo,
        ...prev.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button onClick={() => onClick(Categories.TO_DO)}>Doing</button>
      )}
      {category !== Categories.TO_DO && (
        <button onClick={() => onClick(Categories.DOING)}>To Do</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick(Categories.DONE)}>Done</button>
      )}
    </li>
  );
};

export default ToDo;
