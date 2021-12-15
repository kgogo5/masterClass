import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useRecoilState } from "recoil";
import { categoryState, toDoState } from "./atoms";

interface IForm {
  toDo: string;
}

const CreateToDos = () => {
  const [ToDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((prev) => [...prev, { text: toDo, id: Date.now(), category }]);
    setValue("toDo", "");
  };

  useEffect(() => {
    localStorage.setItem("ToDos", JSON.stringify(ToDos));
  }, [ToDos]);

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please write a To Do" })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
};

export default CreateToDos;
