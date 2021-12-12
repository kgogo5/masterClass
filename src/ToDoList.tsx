import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList() {
  const { register, handleSubmit } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo")} placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
