import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "./atoms";

const ToDo = ({ text, category, id }: IToDo) => {
  const [ToDos, setToDos] = useRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    let result = [];
    setToDos((prev) => {
      const targetIndex = prev.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };

      // 삭제
      if (newCategory === Categories.DELETE) {
        result = [
          ...prev.slice(0, targetIndex),
          ...prev.slice(targetIndex + 1),
        ];
        return result;
      }
      result = [
        ...prev.slice(0, targetIndex),
        newToDo,
        ...prev.slice(targetIndex + 1),
      ];
      return result;
    });
  };

  useEffect(() => {
    localStorage.setItem("ToDos", JSON.stringify(ToDos));
  }, [ToDos]);

  return (
    <li>
      <span>{text} </span>
      {category !== Categories.DOING && (
        <button onClick={() => onClick(Categories.DOING)}>Doing</button>
      )}
      {category !== Categories.TO_DO && (
        <button onClick={() => onClick(Categories.TO_DO)}>To Do</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick(Categories.DONE)}>Done</button>
      )}
      <button onClick={() => onClick(Categories.DELETE)}>Delete</button>
    </li>
  );
};

export default ToDo;
